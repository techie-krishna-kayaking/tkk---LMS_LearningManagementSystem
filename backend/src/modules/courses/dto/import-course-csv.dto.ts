import { IsString, MinLength } from 'class-validator';

export class ImportCourseCsvDto {
  @IsString()
  @MinLength(10)
  csv!: string;
}
