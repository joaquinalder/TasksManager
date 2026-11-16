import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import type { AuthenticatedRequest } from '../auth/authenticated-request';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@ApiTags('tasks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly service: TasksService) {}

  @Post()
  create(@Req() request: AuthenticatedRequest, @Body() data: CreateTaskDto) {
    return this.service.create(request.user.userId, data);
  }

  @Get()
  findAll(@Req() request: AuthenticatedRequest) {
    return this.service.findAll(request.user.userId);
  }

  @Get(':id')
  findOne(@Req() request: AuthenticatedRequest, @Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(request.user.userId, id);
  }

  @Patch(':id')
  update(@Req() request: AuthenticatedRequest, @Param('id', ParseIntPipe) id: number, @Body() data: UpdateTaskDto) {
    return this.service.update(request.user.userId, id, data);
  }

  @Delete(':id')
  remove(@Req() request: AuthenticatedRequest, @Param('id', ParseIntPipe) id: number) {
    return this.service.remove(request.user.userId, id);
  }
}
