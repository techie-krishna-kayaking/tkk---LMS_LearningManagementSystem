import { Body, Controller, Post } from '@nestjs/common';
import { CouponsService } from './coupons.service';

@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Post('validate')
  validate(@Body() body: { amountInr: number; couponCode?: string; userId: string }) {
    return this.couponsService.applyCoupon(body);
  }
}
