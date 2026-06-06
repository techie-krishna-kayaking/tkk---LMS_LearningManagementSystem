import { Body, Controller, Headers, Post, RawBodyRequest, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateOrderDto } from './dto/create-order.dto';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('orders')
  createOrder(@Body() dto: CreateOrderDto) {
    return this.paymentsService.createOrder(dto);
  }

  @Post('webhooks/razorpay')
  handleRazorpayWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('x-razorpay-signature') signature: string,
    @Body() body: Record<string, unknown>,
  ) {
    const rawBody = req.rawBody?.toString('utf8') || JSON.stringify(body);
    this.paymentsService.verifyWebhookSignature(rawBody, signature || '');
    return this.paymentsService.handleWebhook(body);
  }
}
