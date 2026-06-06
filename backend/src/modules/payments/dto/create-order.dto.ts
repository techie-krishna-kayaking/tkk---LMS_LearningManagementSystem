import { IsArray, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  userId!: string;

  @IsArray()
  items!: Array<{ courseId: string; quantity: number }>;

  @IsOptional()
  @IsString()
  couponCode?: string;

  @IsNumber()
  @Min(1)
  amountInr!: number;
}
