import { Controller, Get, Query } from '@nestjs/common';
import { LiveSessionsService } from './live-sessions.service';

@Controller('live-sessions')
export class LiveSessionsController {
  constructor(private readonly liveSessionsService: LiveSessionsService) {}

  @Get(':sessionId/join-token')
  createJoinToken() {
    // Production flow should verify enrollment, schedule window, and session limits.
    return this.liveSessionsService.createJoinToken({
      sessionId: 'ls_001',
      userId: 'demo-user-id',
      meetUrl: 'https://meet.google.com/abc-defg-hij',
    });
  }

  @Get('join/resolve')
  resolve(@Query('token') token: string) {
    return this.liveSessionsService.resolveJoinToken(token);
  }
}
