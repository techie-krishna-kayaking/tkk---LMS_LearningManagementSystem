export interface StudentCourseProgress {
  id: string;
  title: string;
  progressPercent: number;
  completedLessons: number;
  totalLessons: number;
  avgQuizPercent: number;
  nextLessonPath: string;
  lastWatchedAt: string;
}

export const enrolledCourses: StudentCourseProgress[] = [
  {
    id: 'ultimate-etl-testing-automation-mastery',
    title: 'Ultimate ETL Testing & Automation Mastery: Python, Pandas, PySpark + Cloud Projects',
    progressPercent: 73,
    completedLessons: 22,
    totalLessons: 30,
    avgQuizPercent: 81,
    nextLessonPath: '/student/lesson/ultimate-etl-testing-automation-mastery/playlist-main',
    lastWatchedAt: 'Today, 8:15 PM',
  },
  {
    id: 'notes-250-sqls-dwh-etl-testing-concepts',
    title: '[NOTES] 250 SQLs & DWH Concepts + ETL Testing Concepts',
    progressPercent: 41,
    completedLessons: 9,
    totalLessons: 22,
    avgQuizPercent: 76,
    nextLessonPath: '/student/lesson/notes-250-sqls-dwh-etl-testing-concepts/playlist-main',
    lastWatchedAt: 'Yesterday, 10:05 PM',
  },
  {
    id: 'notest-250-sql-queries-etl-bigdata-bi',
    title: '[NOTEST] 250 SQL Queries for ETL + Big Data + BI',
    progressPercent: 18,
    completedLessons: 4,
    totalLessons: 23,
    avgQuizPercent: 69,
    nextLessonPath: '/student/lesson/notest-250-sql-queries-etl-bigdata-bi/playlist-main',
    lastWatchedAt: '2 days ago',
  },
  {
    id: 'roadmap-doc-bigdata-etl-bi-testing',
    title: 'ROAD MAP DOC- Big Data Testing + ETL Testing + BI Testing',
    progressPercent: 89,
    completedLessons: 8,
    totalLessons: 9,
    avgQuizPercent: 0,
    nextLessonPath: '/student/lesson/roadmap-doc-bigdata-etl-bi-testing/playlist-main',
    lastWatchedAt: 'Today, 6:10 PM',
  },
  {
    id: 'resume-profile-building-course',
    title: 'Master Your Career with Our Resume & Profile Building Course',
    progressPercent: 35,
    completedLessons: 5,
    totalLessons: 14,
    avgQuizPercent: 74,
    nextLessonPath: '/student/lesson/resume-profile-building-course/playlist-main',
    lastWatchedAt: '3 days ago',
  },
];
