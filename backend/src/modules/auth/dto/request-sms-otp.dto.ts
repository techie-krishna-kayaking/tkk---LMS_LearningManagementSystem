import { IsString, Matches } from 'class-validator';

export class RequestSmsOtpDto {
  @IsString()
  @Matches(/^\+?[0-9]{10,15}$/)
  phone!: string;
}
