import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { PrismaService } from '../prisma/prisma.service';

const mockPrisma = {
  project: {
    findMany: jest.fn().mockResolvedValue([]),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};


@Module({
  controllers: [ProjectsController],
  providers: [
    ProjectsService,
    PrismaService,
    { provide: PrismaService, useValue: mockPrisma }
  ],
})
export class ProjectsModule {}
