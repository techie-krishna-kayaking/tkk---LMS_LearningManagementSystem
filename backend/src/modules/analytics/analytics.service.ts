import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalyticsService {
  adminSummary() {
    return {
      totalVisitors: 18240,
      totalRegisteredUsers: 2231,
      activeStudents: 849,
      enrollments: 3120,
      completionRatePercent: 61.4,
      revenueInr: 2845000,
      outstandingInstallmentDuesInr: 412000,
      refundsInr: 65000,
      suspiciousSharingEvents: 14,
    };
  }

  studentSummary(studentId: string) {
    return {
      studentId,
      courseProgressPercent: 73,
      lessonsCompleted: 58,
      lastWatchedAt: new Date().toISOString(),
      quizAveragePercent: 81,
      certificatesEarned: 2,
      nextInstallmentDueDate: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
      nextLiveClassAt: new Date(Date.now() + 2 * 86400000).toISOString(),
    };
  }
}
