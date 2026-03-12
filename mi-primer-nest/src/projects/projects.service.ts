import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  create(createProjectDto: CreateProjectDto) {
    const { tareas, ...datosProyecto } = createProjectDto;

    return this.prisma.project.create({
      data: {
        ...datosProyecto,
        tasks: tareas ? {
          connect: tareas.map(id => ({ id }))
        } : undefined,
      },
    });
  }

  async findAll() {
    return this.prisma.project.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  async remove(id: number) {
    this.prisma.task.deleteMany({
      where: {
        projectId: id,
      },
    });

    return this.prisma.project.delete({
      where: { id },
    });
  }
}
