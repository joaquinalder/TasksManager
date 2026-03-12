import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

describe('ProjectController', () => {
  let controller: ProjectsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        {
          provide: ProjectsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            create: jest.fn().mockResolvedValue({ id: 1, name: 'Nuevo Proyecto' }),
          },
        },
      ],
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});