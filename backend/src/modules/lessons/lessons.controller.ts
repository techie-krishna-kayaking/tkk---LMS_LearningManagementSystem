import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { WatchEventDto } from './dto/watch-event.dto';
import { LessonsService } from './lessons.service';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Get(':lessonId/player')
  getLessonPlayer(
    @Param('lessonId') lessonId: string,
    @Query('courseId') courseId: string,
    @Query('userId') userId: string,
  ) {
    return this.lessonsService.getLessonPlayerData(courseId, lessonId, userId || 'demo-user-id');
  }

  @Post('watch-events')
  saveWatchEvent(@Body() dto: WatchEventDto) {
    return this.lessonsService.trackWatchEvent(dto, 'demo-user-id');
  }
}
