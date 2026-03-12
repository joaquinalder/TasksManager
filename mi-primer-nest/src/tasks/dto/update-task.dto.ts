import { PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { IsNumber, IsOptional, IsString, IsBoolean, MinLength } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    @IsString()
    @IsOptional()
    @MinLength(3, {
        message: 'El título debe tener al menos 3 caracteres',
    })
    title?: string;
    
    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsOptional()
    projectId?: number;

    @IsOptional()
    @IsBoolean()
    completed?: boolean;
}


