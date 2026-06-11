import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleSigninDto } from './dto/google-signin.dto';
import { LoginDto } from './dto/login.dto';
import { RequestEmailOtpDto } from './dto/request-email-otp.dto';
import { RequestSmsOtpDto } from './dto/request-sms-otp.dto';
import { RegisterDto } from './dto/register.dto';
import { VerifyEmailOtpDto } from './dto/verify-email-otp.dto';
import { VerifySmsOtpDto } from './dto/verify-sms-otp.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('otp/sms/request')
  requestSmsOtp(@Body() dto: RequestSmsOtpDto) {
    return this.authService.requestSmsOtp(dto.phone);
  }

  @Post('otp/sms/verify')
  verifySmsOtp(@Body() dto: VerifySmsOtpDto) {
    return this.authService.verifySmsOtp(dto.phone, dto.otp);
  }

  @Post('otp/email/request')
  requestEmailOtp(@Body() dto: RequestEmailOtpDto) {
    return this.authService.requestEmailOtp(dto.email);
  }

  @Post('otp/email/verify')
  verifyEmailOtp(@Body() dto: VerifyEmailOtpDto) {
    return this.authService.verifyEmailOtp(dto.email, dto.otp);
  }

  @Post('google/sign-in')
  googleSignIn(@Body() dto: GoogleSigninDto) {
    return this.authService.googleSignIn(dto);
  }
}
