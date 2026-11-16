import { randomUUID } from 'node:crypto';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Tasks API with PostgreSQL', () => {
  let app: INestApplication;
  let firstToken: string;
  let secondToken: string;
  const passport = (token: string) => ({ Authorization: `Bearer ${token}` });

  async function registerAndLogin() {
    const account = {
      email: `test-${randomUUID()}@example.com`,
      password: 'test-suite-password',
    };
    const server = app.getHttpServer();
    const registration = await request(server).post('/api/v1/auth/register').send(account).expect(201);
    expect(registration.body).toEqual({ id: expect.any(Number), email: account.email, name: null });
    await request(server).post('/api/v1/auth/register').send(account).expect(409);
    const response = await request(server).post('/api/v1/auth/login').send(account).expect(200);
    return response.body.access_token;
  }

  beforeAll(async () => {
    if (!process.env.DATABASE_URL) throw new Error('Set DATABASE_URL to a dedicated test database.');
    const module = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = module.createNestApplication();
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
    await app.init();
    firstToken = await registerAndLogin();
    secondToken = await registerAndLogin();
  });

  afterAll(async () => { await app?.close(); });

  it('requires authentication to list tasks and projects', async () => {
    const server = app.getHttpServer();
    await request(server).get('/api/v1/tasks').expect(401);
    await request(server).get('/api/v1/projects').expect(401);
  });

  it('keeps projects and tasks isolated between owners', async () => {
    const server = app.getHttpServer();
    const mine = passport(firstToken);
    const other = passport(secondToken);
    const project = await request(server).post('/api/v1/projects').set(mine).send({ name: 'Proyecto propio' }).expect(201);
    const projectId = project.body.id;
    const task = await request(server).post('/api/v1/tasks').set(mine).send({ title: 'Tarea propia', projectId }).expect(201);
    const taskId = task.body.id;

    const ownTasks = await request(server).get('/api/v1/tasks').set(mine).expect(200);
    expect(ownTasks.body).toContainEqual(expect.objectContaining({ id: taskId }));
    const otherTasks = await request(server).get('/api/v1/tasks').set(other).expect(200);
    expect(otherTasks.body).not.toContainEqual(expect.objectContaining({ id: taskId }));
    const otherProjects = await request(server).get('/api/v1/projects').set(other).expect(200);
    expect(otherProjects.body).not.toContainEqual(expect.objectContaining({ id: projectId }));

    await request(server).get(`/api/v1/projects/${projectId}`).set(other).expect(404);
    await request(server).patch(`/api/v1/projects/${projectId}`).set(other).send({ name: 'Otro nombre' }).expect(404);
    await request(server).delete(`/api/v1/projects/${projectId}`).set(other).expect(404);
    await request(server).get(`/api/v1/tasks/${taskId}`).set(other).expect(404);
    await request(server).patch(`/api/v1/tasks/${taskId}`).set(other).send({ completed: true }).expect(404);
    await request(server).delete(`/api/v1/tasks/${taskId}`).set(other).expect(404);
    await request(server).post('/api/v1/tasks').set(other).send({ title: 'Otra tarea', projectId }).expect(404);
    await request(server).post('/api/v1/projects').set(other).send({ name: 'Otro proyecto', tareas: [taskId] }).expect(404);

    const update = await request(server).patch(`/api/v1/tasks/${taskId}`).set(mine).send({ completed: true }).expect(200);
    expect(update.body.projectId).toBe(projectId);
    const detached = await request(server).patch(`/api/v1/tasks/${taskId}`).set(mine).send({ projectId: null }).expect(200);
    expect(detached.body.projectId).toBeNull();
  });

  it('validates input and keeps a task when its project is deleted', async () => {
    const server = app.getHttpServer();
    const mine = passport(firstToken);
    await request(server).post('/api/v1/tasks').set(mine).send({ title: 'Tarea', completed: null }).expect(400);
    await request(server).get('/api/v1/tasks/abc').set(mine).expect(400);
    const task = await request(server).post('/api/v1/tasks').set(mine).send({ title: 'Tarea sin proyecto' }).expect(201);
    const taskId = task.body.id;
    const project = await request(server).post('/api/v1/projects').set(mine).send({ name: 'Temporal', tareas: [taskId] }).expect(201);
    const projectId = project.body.id;
    const changed = await request(server).patch(`/api/v1/projects/${projectId}`).set(mine).send({ name: 'Editado' }).expect(200);
    expect(changed.body.name).toBe('Editado');
    await request(server).delete(`/api/v1/projects/${projectId}`).set(mine).expect(200);
    const remaining = await request(server).get(`/api/v1/tasks/${taskId}`).set(mine).expect(200);
    expect(remaining.body.projectId).toBeNull();
  });
});
