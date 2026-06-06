import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CoursesService {
  private readonly demoCourses = [
    {
      id: 'c_etl_mastery_001',
      title: 'Ultimate ETL Testing & Automation Mastery: Python, Pandas, PySpark + Cloud Projects',
      slug: 'ultimate-etl-testing-automation-mastery',
      published: true,
      priceInr: 17999,
      originalPriceInr: 33010,
      tags: ['LIVE CLASS', 'FREE CONTENT', 'VIDEOS'],
      playlistId: 'PLhXtefn-T4njrv4MS1aiB5w3P0w9jBVYE',
      lessonPath: '/student/lesson/ultimate-etl-testing-automation-mastery/playlist-main',
    },
    {
      id: 'c_sql_notest_002',
      title: '[NOTEST] 250 SQL Queries for ETL + Big Data + BI',
      slug: 'notest-250-sql-queries-etl-bigdata-bi',
      published: true,
      priceInr: 99,
      originalPriceInr: 209,
      tags: ['FILES'],
      playlistId: 'PLhXtefn-T4njrv4MS1aiB5w3P0w9jBVYE',
      lessonPath: '/student/lesson/notest-250-sql-queries-etl-bigdata-bi/playlist-main',
    },
    {
      id: 'c_sql_notes_003',
      title: '[NOTES] 250 SQLs & DWH Concepts + ETL Testing Concepts',
      slug: 'notes-250-sqls-dwh-etl-testing-concepts',
      published: true,
      priceInr: 499,
      originalPriceInr: 1010,
      tags: ['VIDEOS', 'FILES'],
      playlistId: 'PLhXtefn-T4njrv4MS1aiB5w3P0w9jBVYE',
      lessonPath: '/student/lesson/notes-250-sqls-dwh-etl-testing-concepts/playlist-main',
    },
    {
      id: 'c_roadmap_004',
      title: 'ROAD MAP DOC- Big Data Testing + ETL Testing + BI Testing',
      slug: 'roadmap-doc-bigdata-etl-bi-testing',
      published: true,
      priceInr: 36,
      tags: ['FILES'],
      playlistId: 'PLhXtefn-T4njrv4MS1aiB5w3P0w9jBVYE',
      lessonPath: '/student/lesson/roadmap-doc-bigdata-etl-bi-testing/playlist-main',
    },
    {
      id: 'c_resume_005',
      title: 'Master Your Career with Our Resume & Profile Building Course',
      slug: 'resume-profile-building-course',
      published: true,
      priceInr: 509,
      originalPriceInr: 1009,
      tags: ['FREE CONTENT', 'VIDEOS', 'FILES'],
      playlistId: 'PLhXtefn-T4njrv4MS1aiB5w3P0w9jBVYE',
      lessonPath: '/student/lesson/resume-profile-building-course/playlist-main',
    },
  ];

  listPublic() {
    return this.demoCourses.filter((c) => c.published);
  }

  create(dto: CreateCourseDto) {
    const course = { id: `c_${Date.now()}`, ...dto };
    this.demoCourses.push(course as any);
    return course;
  }
}
