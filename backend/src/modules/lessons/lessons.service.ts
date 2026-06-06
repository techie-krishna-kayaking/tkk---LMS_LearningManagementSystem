import { Injectable } from '@nestjs/common';
import { WatchEventDto } from './dto/watch-event.dto';

@Injectable()
export class LessonsService {
  getLessonPlayerData(courseId: string, lessonId: string, userId: string) {
    // In production, enforce enrollment + signed access checks here.
    return {
      courseId,
      lessonId,
      userId,
      playbackProvider: 'youtube_unlisted_mvp',
      playbackToken: `signed-${lessonId}-${Date.now()}`,
      watermarkPayload: {
        name: 'Student Name',
        email: 'student@example.com',
        phone: '+91-9000000000',
        ts: new Date().toISOString(),
        sessionHint: 'sess-9ab2',
      },
    };
  }

  trackWatchEvent(dto: WatchEventDto, userId: string) {
    return {
      status: 'accepted',
      userId,
      lessonId: dto.lessonId,
      watchedPercent: Number(((dto.watchedSeconds / Math.max(dto.totalSeconds, 1)) * 100).toFixed(2)),
    };
  }
}
