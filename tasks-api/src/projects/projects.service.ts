import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { recordOr404 } from '../prisma/record-or-404';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: number, { tareas, ...project }: CreateProjectDto) {
    return recordOr404(this.prisma.project.create({
      data: {
        ...project,
        user: { connect: { id: userId } },
        tasks: tareas?.length ? { connect: tareas.map((id) => ({ id, userId })) } : undefined,
      },
    }));
  }

  findAll(userId: number) {
    return this.prisma.project.findMany({ where: { userId }, orderBy: { id: 'asc' } });
  }

  findOne(userId: number, id: number) {
    return recordOr404(this.prisma.project.findUnique({ where: { id, userId } }));
  }

  update(userId: number, id: number, { tareas, ...project }: UpdateProjectDto) {
    return recordOr404(this.prisma.project.update({
      where: { id, userId },
      data: {
        ...project,
        tasks: tareas?.length ? { connect: tareas.map((taskId) => ({ id: taskId, userId })) } : undefined,
      },
    }));
  }

  remove(userId: number, id: number) {
    return recordOr404(this.prisma.project.delete({ where: { id, userId } }));
  }
}
