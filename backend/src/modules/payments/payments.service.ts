import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as crypto from 'crypto';
import { CouponsService } from '../coupons/coupons.service';
import { InstallmentsService } from '../installments/installments.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly couponsService: CouponsService,
    private readonly installmentsService: InstallmentsService,
  ) {}

  createOrder(dto: CreateOrderDto) {
    const pricing = this.couponsService.applyCoupon({
      amountInr: dto.amountInr,
      couponCode: dto.couponCode,
      userId: dto.userId,
    });

    return {
      orderId: `order_${Date.now()}`,
      amountBeforeDiscount: dto.amountInr,
      amountAfterDiscount: pricing.finalAmountInr,
      discountInr: pricing.discountInr,
      currency: 'INR',
      razorpayOrderHint: 'Create Razorpay order here with SDK',
    };
  }

  verifyWebhookSignature(rawBody: string, signature: string) {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET || '';
    const digest = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
    if (digest !== signature) {
      throw new UnauthorizedException('Invalid Razorpay signature');
    }
    return true;
  }

  handleWebhook(event: Record<string, unknown>) {
    return {
      status: 'processed',
      eventType: event['event'],
      note: 'Persist webhook + reconcile payment/order/installment state in DB',
    };
  }

  planInstallments(orderId: string, amountInr: number) {
    return this.installmentsService.buildPlan(orderId, amountInr, 3);
  }
}
