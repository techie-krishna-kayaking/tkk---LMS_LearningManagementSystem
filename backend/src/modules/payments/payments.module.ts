import { Module } from '@nestjs/common';
import { CouponsModule } from '../coupons/coupons.module';
import { InstallmentsModule } from '../installments/installments.module';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';

@Module({
  imports: [CouponsModule, InstallmentsModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
