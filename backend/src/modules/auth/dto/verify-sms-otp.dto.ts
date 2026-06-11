import { IsString, Length, Matches } from 'class-validator';

export class VerifySmsOtpDto {
  @IsString()
  @Matches(/^\+?[0-9]{10,15}$/)
  phone!: string;

  @IsString()
  @Length(6, 6)
  otp!: string;
}
