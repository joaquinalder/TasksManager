import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import type { AuthenticatedRequest } from '../auth/authenticated-request';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsService } from './projects.service';

@ApiTags('projects')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private readonly service: ProjectsService) {}

  @Post()
  create(@Req() request: AuthenticatedRequest, @Body() data: CreateProjectDto) {
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
  update(@Req() request: AuthenticatedRequest, @Param('id', ParseIntPipe) id: number, @Body() data: UpdateProjectDto) {
    return this.service.update(request.user.userId, id, data);
  }

  @Delete(':id')
  remove(@Req() request: AuthenticatedRequest, @Param('id', ParseIntPipe) id: number) {
    return this.service.remove(request.user.userId, id);
  }
}
