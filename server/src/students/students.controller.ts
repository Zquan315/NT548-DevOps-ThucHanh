import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }

  @Patch(':id/subjects')
  addSubject(
    @Param('id') id: string,
    @Body() subjectData: { name: string; score: number },
  ) {
    return this.studentsService.addSubject(id, subjectData);
  }

  @Patch(':id/subjects/:subjectName')
  updateSubjectScore(
    @Param('id') id: string,
    @Param('subjectName') subjectName: string,
    @Body() newScore: { score: number },
  ) {
    return this.studentsService.updateSubjectScore(
      id,
      subjectName,
      newScore.score,
    );
  }

  @Delete(':id/subjects/:subjectName')
  removeSubject(
    @Param('id') id: string,
    @Param('subjectName') subjectName: string,
  ) {
    return this.studentsService.removeSubject(id, subjectName);
  }
}
