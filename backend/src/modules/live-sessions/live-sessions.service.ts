import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class LiveSessionsService {
  createJoinToken(input: { sessionId: string; userId: string; meetUrl: string }) {
    const token = jwt.sign(
      {
        sub: input.userId,
        sid: input.sessionId,
        meetUrl: input.meetUrl,
        usage: 'live-class-join',
      },
      process.env.JWT_ACCESS_SECRET || 'change_me_access',
      { expiresIn: '2m' },
    );

    return {
      joinToken: token,
      expiresInSeconds: 120,
      redirectUrl: `/api/v1/live-sessions/join/resolve?token=${token}`,
    };
  }

  resolveJoinToken(token: string) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET || 'change_me_access') as {
        meetUrl: string;
      };
      return { meetUrl: decoded.meetUrl };
    } catch {
      throw new UnauthorizedException('Join token invalid or expired');
    }
  }
}
