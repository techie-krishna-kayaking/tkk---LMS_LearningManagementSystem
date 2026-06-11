import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import { GoogleSigninDto } from './dto/google-signin.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

const DEMO_EMAIL = 'student@tkklms.demo';
const DEMO_PASSWORD = 'Demo@12345';
const DEMO_PHONE = '+919000000000';

interface OtpEntry {
  otp: string;
  expiresAtMs: number;
}

@Injectable()
export class AuthService {
  private readonly smsOtpStore = new Map<string, OtpEntry>();
  private readonly emailOtpStore = new Map<string, OtpEntry>();

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

    return this.issueTokens({
      id: 'demo-user-id',
      email: DEMO_EMAIL,
      fullName: 'Demo Student',
      phone: DEMO_PHONE,
      roles: ['student'],
    });
  }

  requestSmsOtp(phone: string) {
    const otp = this.generateOtp();
    this.smsOtpStore.set(phone, {
      otp,
      expiresAtMs: Date.now() + 5 * 60 * 1000,
    });

    return {
      status: 'OTP_SENT',
      channel: 'sms',
      phone,
      // For dev/demo visibility. Hide this in production.
      otp,
      message: 'SMS OTP sent. Integrate Twilio/MSG91 in production.',
    };
  }

  verifySmsOtp(phone: string, otp: string) {
    const record = this.smsOtpStore.get(phone);
    if (!record || record.expiresAtMs < Date.now() || record.otp !== otp) {
      throw new UnauthorizedException('Invalid or expired SMS OTP');
    }

    this.smsOtpStore.delete(phone);
    return this.issueTokens({
      id: 'demo-user-id',
      email: DEMO_EMAIL,
      fullName: 'Demo Student',
      phone,
      roles: ['student'],
    });
  }

  requestEmailOtp(email: string) {
    const otp = this.generateOtp();
    this.emailOtpStore.set(email.toLowerCase(), {
      otp,
      expiresAtMs: Date.now() + 5 * 60 * 1000,
    });

    return {
      status: 'OTP_SENT',
      channel: 'gmail',
      email,
      // For dev/demo visibility. Hide this in production.
      otp,
      message: 'Gmail OTP sent. Integrate Nodemailer/SES in production.',
    };
  }

  verifyEmailOtp(email: string, otp: string) {
    const key = email.toLowerCase();
    const record = this.emailOtpStore.get(key);
    if (!record || record.expiresAtMs < Date.now() || record.otp !== otp) {
      throw new UnauthorizedException('Invalid or expired email OTP');
    }

    this.emailOtpStore.delete(key);
    return this.issueTokens({
      id: 'demo-user-id',
      email,
      fullName: 'Demo Student',
      phone: DEMO_PHONE,
      roles: ['student'],
    });
  }

  googleSignIn(input: GoogleSigninDto) {
    if (!input.idToken && !input.email) {
      throw new UnauthorizedException('Google sign-in requires idToken or email in this demo');
    }

    const email = (input.email || DEMO_EMAIL).toLowerCase();
    const fullName = input.fullName || 'Google Student';

    return this.issueTokens({
      id: 'demo-user-id',
      email,
      fullName,
      phone: DEMO_PHONE,
      roles: ['student'],
    });
  }

  private issueTokens(user: {
    id: string;
    email: string;
    fullName: string;
    phone: string;
    roles: string[];
  }) {
    const accessToken = jwt.sign(
      {
        sub: user.id,
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
        roles: user.roles,
      },
      process.env.JWT_ACCESS_SECRET || 'change_me_access',
      {
        issuer: process.env.JWT_ISSUER,
        audience: process.env.JWT_AUDIENCE,
        expiresIn: Number(process.env.JWT_ACCESS_TTL_SECONDS || 900),
      },
    );

    const refreshToken = jwt.sign(
      { sub: user.id, tokenType: 'refresh' },
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
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
    };
  }

  private generateOtp(): string {
    return `${Math.floor(100000 + Math.random() * 900000)}`;
  }
}
