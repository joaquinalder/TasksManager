import { ExecutionContext, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';
import { TasksModule } from './tasks.module';
import { TasksService } from './tasks.service';

describe('TasksController validation', () => {
  let app: INestApplication;
  const create = jest.fn();

  beforeAll(async () => {
    const module = await Test.createTestingModule({ imports: [TasksModule] })
      .overrideProvider(PrismaService)
      .useValue({})
      .overrideProvider(TasksService)
      .useValue({ create })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate(context: ExecutionContext) {
          context.switchToHttp().getRequest().user = { userId: 42 };
          return true;
        },
      })
      .compile();
    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
    await app.init();
  });

  afterAll(async () => { await app?.close(); });

  it('rejects an empty title before writing', async () => {
    const response = await request(app.getHttpServer()).post('/tasks').send({ title: '' }).expect(400);
    expect(response.body.message).toContain('El título no puede estar vacío');
    expect(create).not.toHaveBeenCalled();
  });

  it('passes the authenticated user to the service', async () => {
    await request(app.getHttpServer()).post('/tasks').send({ title: 'Aprender Testing' }).expect(201);
    expect(create).toHaveBeenCalledWith(42, expect.objectContaining({ title: 'Aprender Testing' }));
  });
});
