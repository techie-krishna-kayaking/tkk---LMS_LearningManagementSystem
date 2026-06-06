import { IsNumber, IsString, Min } from 'class-validator';

export class WatchEventDto {
  @IsString()
  lessonId!: string;

  @IsNumber()
  @Min(0)
  watchedSeconds!: number;

  @IsNumber()
  @Min(0)
  totalSeconds!: number;
}
