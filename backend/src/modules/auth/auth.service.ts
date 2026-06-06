import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

const DEMO_EMAIL = 'student@tkklms.demo';
const DEMO_PASSWORD = 'Demo@12345';

@Injectable()
export class AuthService {
  async register(dto: RegisterDto) {
    const passwordHash = await argon2.hash(dto.password);

    return {
      user: {
        id: 'replace-with-db-id',
        email: dto.email,
        fullName: dto.fullName,
        phone: dto.phone || null,
        passwordHash,
      },
      message: 'Registration accepted. Persist with Prisma in next step.',
    };
  }

  async login(dto: LoginDto) {
    if (dto.email !== DEMO_EMAIL || dto.password !== DEMO_PASSWORD) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = jwt.sign(
      {
        sub: 'demo-user-id',
        email: DEMO_EMAIL,
        fullName: 'Demo Student',
        phone: '+91-9000000000',
        roles: ['student'],
      },
      process.env.JWT_ACCESS_SECRET || 'change_me_access',
      {
        issuer: process.env.JWT_ISSUER,
        audience: process.env.JWT_AUDIENCE,
        expiresIn: Number(process.env.JWT_ACCESS_TTL_SECONDS || 900),
      },
    );

    const refreshToken = jwt.sign(
      { sub: 'demo-user-id', tokenType: 'refresh' },
      process.env.JWT_REFRESH_SECRET || 'change_me_refresh',
      {
        issuer: process.env.JWT_ISSUER,
        audience: process.env.JWT_AUDIENCE,
        expiresIn: Number(process.env.JWT_REFRESH_TTL_SECONDS || 2592000),
      },
    );

    return {
      accessToken,
      refreshToken,
      user: {
        id: 'demo-user-id',
        email: DEMO_EMAIL,
        fullName: 'Demo Student',
      },
    };
  }
}
