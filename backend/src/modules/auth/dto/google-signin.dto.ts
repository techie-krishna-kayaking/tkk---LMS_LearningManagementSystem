import { IsEmail, IsOptional, IsString } from 'class-validator';

export class GoogleSigninDto {
  @IsOptional()
  @IsString()
  idToken?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  fullName?: string;
}
