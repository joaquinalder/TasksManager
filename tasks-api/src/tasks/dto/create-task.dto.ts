import { IsString, IsNotEmpty, MinLength, IsOptional, IsInt, Min, IsBoolean, ValidateIf } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty({ message: 'El título no puede estar vacío' })
  @MinLength(3, { message: 'El título debe tener al menos 3 caracteres' })
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  projectId?: number | null;

  @IsBoolean()
  @ValidateIf((_, value) => value !== undefined)
  completed?: boolean;
}