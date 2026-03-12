import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { TasksModule } from './tasks.module';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';

describe('Tasks Validation (Functional)', () => {
  let app: INestApplication;

  const mockTasksService = { create: jest.fn() };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TasksModule],
    })
      .overrideProvider(TasksService)
      .useValue(mockTasksService)
      .overrideGuard(JwtAuthGuard)
      .useValue(mockTasksService)
      .compile();

    app = moduleFixture.createNestApplication();
    
    app.useGlobalPipes(new ValidationPipe()); 
    await app.init();
  });

  it('debería devolver 400 Bad Request si el título está vacío', () => {
    return request(app.getHttpServer())
      .post('/tasks')
      .send({ title: '' }) // Enviamos basura
      .expect(400)
      .expect((res) => {
        // Verificamos que el mensaje de error sea el que pusimos en el DTO
        expect(res.body.message).toContain('El título no puede estar vacío');
      });
  });

  it('debería dejar pasar la petición si el título es correcto', () => {
    return request(app.getHttpServer())
      .post('/tasks')
      .send({ title: 'Aprender Testing' })
      .expect(201);
  });

  afterAll(async () => {
    await app.close();
  });
});