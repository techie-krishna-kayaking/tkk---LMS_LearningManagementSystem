import { Body, Controller, Post } from '@nestjs/common';
import { InstallmentsService } from './installments.service';

@Controller('installments')
export class InstallmentsController {
  constructor(private readonly installmentsService: InstallmentsService) {}

  @Post('preview')
  preview(@Body() body: { orderId: string; amountInr: number; parts: number }) {
    return this.installmentsService.buildPlan(body.orderId, body.amountInr, body.parts);
  }
}
