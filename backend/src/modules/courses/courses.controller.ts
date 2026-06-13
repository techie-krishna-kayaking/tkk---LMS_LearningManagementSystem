import { Body, Controller, Get, Post } from '@nestjs/common';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreateCourseDto } from './dto/create-course.dto';
import { ImportCourseCsvDto } from './dto/import-course-csv.dto';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get('public')
  listPublicCourses() {
    return this.coursesService.listPublic();
  }

  @Post()
  @Roles('admin', 'trainer')
  createCourse(@Body() dto: CreateCourseDto) {
    return this.coursesService.create(dto);
  }

  @Get('admin/curriculum')
  @Roles('admin', 'trainer')
  getImportedCurriculum() {
    return this.coursesService.getImportedCurriculum();
  }

  @Post('admin/import-csv')
  @Roles('admin', 'trainer')
  importCsv(@Body() dto: ImportCourseCsvDto) {
    return this.coursesService.importCurriculumCsv(dto.csv);
  }
}
