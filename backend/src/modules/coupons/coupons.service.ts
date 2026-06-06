import { Injectable } from '@nestjs/common';

interface ApplyCouponInput {
  amountInr: number;
  couponCode?: string;
  userId: string;
}

@Injectable()
export class CouponsService {
  applyCoupon(input: ApplyCouponInput) {
    if (!input.couponCode) {
      return {
        code: null,
        discountInr: 0,
        finalAmountInr: input.amountInr,
      };
    }

    // Demo rule engine: FLAT500 or SAVE10.
    let discountInr = 0;
    if (input.couponCode.toUpperCase() === 'FLAT500') {
      discountInr = 500;
    } else if (input.couponCode.toUpperCase() === 'SAVE10') {
      discountInr = Math.floor(input.amountInr * 0.1);
    }

    const finalAmountInr = Math.max(0, input.amountInr - discountInr);

    return {
      code: input.couponCode,
      discountInr,
      finalAmountInr,
    };
  }
}
