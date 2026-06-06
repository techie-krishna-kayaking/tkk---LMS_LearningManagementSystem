import { Controller, Get, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('admin/summary')
  adminSummary() {
    return this.analyticsService.adminSummary();
  }

  @Get('student/summary')
  studentSummary(@Query('studentId') studentId: string) {
    return this.analyticsService.studentSummary(studentId || 'demo-user-id');
  }
}
