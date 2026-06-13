import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';

export interface ImportedChapter {
  id: string;
  title: string;
  ytLink: string;
}

export interface ImportedModule {
  id: string;
  title: string;
  chapters: ImportedChapter[];
}

export interface ImportedCourse {
  id: string;
  title: string;
  slug: string;
  modules: ImportedModule[];
}

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

  private importedCurriculum: ImportedCourse[] = [];

  listPublic() {
    return this.demoCourses.filter((c) => c.published);
  }

  create(dto: CreateCourseDto) {
    const course = { id: `c_${Date.now()}`, ...dto };
    this.demoCourses.push(course as any);
    return course;
  }

  getImportedCurriculum() {
    return this.importedCurriculum;
  }

  importCurriculumCsv(csvText: string) {
    const lines = csvText
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    if (lines.length < 2) {
      return {
        importedCourses: [],
        totalRows: 0,
        message: 'CSV must include a header and at least one data row.',
      };
    }

    const header = this.splitCsvLine(lines[0]).map((item) => item.toLowerCase().trim());
    const required = ['course', 'module', 'chapter', 'yt-link'];
    const missing = required.filter((key) => !header.includes(key));

    if (missing.length > 0) {
      return {
        importedCourses: [],
        totalRows: 0,
        message: `Missing required header columns: ${missing.join(', ')}`,
      };
    }

    const idx = {
      course: header.indexOf('course'),
      module: header.indexOf('module'),
      chapter: header.indexOf('chapter'),
      ytLink: header.indexOf('yt-link'),
    };

    const courseMap = new Map<string, ImportedCourse>();
    let rowCounter = 0;

    for (const rawLine of lines.slice(1)) {
      const cols = this.splitCsvLine(rawLine);
      const courseTitle = (cols[idx.course] || '').trim();
      const moduleTitle = (cols[idx.module] || '').trim();
      const chapterTitle = (cols[idx.chapter] || '').trim();
      const ytLink = (cols[idx.ytLink] || '').trim();

      if (!courseTitle || !moduleTitle || !chapterTitle || !ytLink) {
        continue;
      }

      rowCounter += 1;

      const courseKey = courseTitle.toLowerCase();
      let course = courseMap.get(courseKey);
      if (!course) {
        course = {
          id: `imp_course_${courseMap.size + 1}`,
          title: courseTitle,
          slug: this.slugify(courseTitle),
          modules: [],
        };
        courseMap.set(courseKey, course);
      }

      const moduleKey = moduleTitle.toLowerCase();
      let module = course.modules.find((item) => item.title.toLowerCase() === moduleKey);
      if (!module) {
        module = {
          id: `imp_module_${course.modules.length + 1}`,
          title: moduleTitle,
          chapters: [],
        };
        course.modules.push(module);
      }

      module.chapters.push({
        id: `imp_chapter_${module.chapters.length + 1}`,
        title: chapterTitle,
        ytLink,
      });
    }

    this.importedCurriculum = Array.from(courseMap.values());

    return {
      importedCourses: this.importedCurriculum,
      totalRows: rowCounter,
      message: `Imported ${rowCounter} row(s) into ${this.importedCurriculum.length} course(s).`,
    };
  }

  private splitCsvLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i += 1) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i += 1;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (ch === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += ch;
      }
    }

    result.push(current.trim());
    return result;
  }

  private slugify(value: string): string {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  }
}
