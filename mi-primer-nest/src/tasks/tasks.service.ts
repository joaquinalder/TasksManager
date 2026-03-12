import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: createTaskDto,
    });
  }

  async findAll() {
    return this.prisma.task.findMany(
      {
        include: {
          project: true,
        },
      }
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    console.log('Datos recibidos en el Service:', updateTaskDto);
    const { projectId, ...rest } = updateTaskDto;

    return this.prisma.task.update( 
      {
      where: { id },
      data: {...rest,
        project: projectId ? 
          { connect: { id: projectId } } : {disconnect: true},
      }
    });
  }

  async remove(id: number) {
    return this.prisma.task.delete({
      where: { id },
    });    
  }

  isOverdue(task: { dueDate: Date }): boolean {
    if (!task.dueDate) return false;
    return new Date(task.dueDate).getTime() < new Date().getTime();
  }
}
