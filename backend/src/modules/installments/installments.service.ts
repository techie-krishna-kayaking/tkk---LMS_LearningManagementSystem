import { Injectable } from '@nestjs/common';

@Injectable()
export class InstallmentsService {
  buildPlan(orderId: string, amountInr: number, parts: number) {
    const installmentAmount = Math.ceil(amountInr / parts);
    const schedule = Array.from({ length: parts }).map((_, idx) => ({
      installmentNo: idx + 1,
      dueDate: new Date(Date.now() + idx * 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10),
      amountInr: idx + 1 === parts ? amountInr - installmentAmount * (parts - 1) : installmentAmount,
      status: 'pending',
    }));

    return {
      orderId,
      amountInr,
      parts,
      schedule,
    };
  }
}
