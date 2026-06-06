import { Controller, Get, Param, Query } from '@nestjs/common';
import { PracticeLinksService } from './practice-links.service';

@Controller('practice-links')
export class PracticeLinksController {
  constructor(private readonly practiceLinksService: PracticeLinksService) {}

  @Get(':courseId')
  get(@Param('courseId') courseId: string, @Query('lessonId') lessonId?: string) {
    return this.practiceLinksService.getPracticeLink(courseId, lessonId);
  }
}
