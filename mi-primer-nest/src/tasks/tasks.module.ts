import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaService } from '../prisma/prisma.service';

const mockPrisma = {
  task: {
    findMany: jest.fn().mockResolvedValue([]),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};


@Module({
  controllers: [TasksController],
  providers: 
  [TasksService,
    PrismaService,
    {
      provide: PrismaService, useValue: mockPrisma,
    },
  ],
})
export class TasksModule {}
