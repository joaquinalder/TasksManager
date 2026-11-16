import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { recordOr404 } from '../prisma/record-or-404';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: number, { projectId, ...task }: CreateTaskDto) {
    return recordOr404(this.prisma.task.create({
      data: {
        ...task,
        user: { connect: { id: userId } },
        project: projectId == null ? undefined : { connect: { id: projectId, userId } },
      },
      include: { project: true },
    }));
  }

  findAll(userId: number) {
    return this.prisma.task.findMany({
      where: { userId },
      include: { project: true },
      orderBy: { id: 'asc' },
    });
  }

  findOne(userId: number, id: number) {
    return recordOr404(this.prisma.task.findUnique({
      where: { id, userId },
      include: { project: true },
    }));
  }

  update(userId: number, id: number, { projectId, ...task }: UpdateTaskDto) {
    return recordOr404(this.prisma.task.update({
      where: { id, userId },
      data: {
        ...task,
        project: projectId === undefined
          ? undefined
          : projectId === null
            ? { disconnect: true }
            : { connect: { id: projectId, userId } },
      },
      include: { project: true },
    }));
  }

  remove(userId: number, id: number) {
    return recordOr404(this.prisma.task.delete({ where: { id, userId } }));
  }

  isOverdue(task: { dueDate: Date }) {
    return !!task.dueDate && new Date(task.dueDate).getTime() < Date.now();
  }
}
