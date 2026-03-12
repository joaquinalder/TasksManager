import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('TasksController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/tasks (GET) - Debería retornar 401 si no hay token', () => {
    return request(app.getHttpServer())
      .get('/tasks')
      .expect(401); // Verificamos que tu seguridad funcione
  });

  it('/tasks (GET) - Debería retornar lista de tareas para usuario logueado', async () => {
    // Aquí podrías mockear el AuthGuard o pasar un token real
    const response = await request(app.getHttpServer())
      .get('/tasks')
      .set('Authorization', 'Bearer TOKEN_VALIDO_AQUÍ')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  afterAll(async () => {
    await app.close();
  });
});