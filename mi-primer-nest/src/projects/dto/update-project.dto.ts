import { PartialType } from '@nestjs/swagger';
import { CreateProjectDto } from './create-project.dto';
import { IsNotEmpty, IsString, MinLength, IsOptional, IsNumber, IsArray } from 'class-validator';


export class UpdateProjectDto extends PartialType(CreateProjectDto) {
    @IsString()
    @IsNotEmpty()
    @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    nombre: string;
    @IsNumber()
    @IsNotEmpty()
    id: number;
    @IsString()
    @IsOptional()
    descripcion?: string;
    @IsArray()
    @IsOptional()
    tareas?: number[];
}


