import { IsString, IsNotEmpty, MinLength, IsOptional, isString, minLength, IsArray } from 'class-validator';

export class CreateProjectDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    name: string;

    @IsString()
    @IsOptional()
    description?: string;
    
    @IsArray()
    @IsOptional()
    tareas?: number[];
}
