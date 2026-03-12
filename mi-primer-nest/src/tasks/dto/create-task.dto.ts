import { IsString, IsNotEmpty, MinLength, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty({ message: 'El título no puede estar vacío' })
  @MinLength(3, { message: 'El título debe tener al menos 3 caracteres' })
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  projectId?: number;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}