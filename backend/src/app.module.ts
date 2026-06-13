import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guards/roles.guard';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { AuthModule } from './modules/auth/auth.module';
import { CouponsModule } from './modules/coupons/coupons.module';
import { CoursesModule } from './modules/courses/courses.module';
import { InstallmentsModule } from './modules/installments/installments.module';
import { LessonsModule } from './modules/lessons/lessons.module';
import { LiveSessionsModule } from './modules/live-sessions/live-sessions.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { PracticeLinksModule } from './modules/practice-links/practice-links.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    CoursesModule,
    LessonsModule,
    PaymentsModule,
    CouponsModule,
    InstallmentsModule,
    AnalyticsModule,
    LiveSessionsModule,
    PracticeLinksModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
