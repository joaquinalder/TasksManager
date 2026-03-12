import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from './projects.service';
import { PrismaService } from '../prisma/prisma.service';
import { TasksService } from '../tasks/tasks.service';

describe('ProjectsService', () => {
  let service: ProjectsService;

  const mockPrismaService = {
    project: {
      findMany: jest.fn().mockResolvedValue([]),
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        { provide: PrismaService, useValue: mockPrismaService },
        // Mockeamos TasksService para romper la dependencia circular en el test
        { provide: TasksService, useValue: { findAll: jest.fn() } },
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});