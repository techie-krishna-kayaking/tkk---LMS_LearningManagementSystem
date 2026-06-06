import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @MinLength(4)
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  slug!: string;

  @IsBoolean()
  published!: boolean;
}
