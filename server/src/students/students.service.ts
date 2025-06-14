import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const createdStudent = new this.studentModel(createStudentDto);
    return createdStudent.save();
  }

  async findAll(): Promise<Student[]> {
    return this.studentModel.find().exec();
  }

  async findOne(id: string): Promise<Student> {
    const student = await this.studentModel.findOne({ id }).exec();
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }

  async update(
    id: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    const updatedStudent = await this.studentModel
      .findOneAndUpdate({ id }, updateStudentDto, { new: true })
      .exec();
    if (!updatedStudent) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return updatedStudent;
  }

  async remove(id: string): Promise<void> {
    const result = await this.studentModel.findOneAndDelete({ id }).exec();
    if (!result) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
  }

  // Thêm môn học và tính lại GPA
  async addSubject(
    id: string,
    subjectData: { name: string; score: number },
  ): Promise<Student> {
    const student = await this.studentModel.findOne({ id });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    student.subjects.push(subjectData);

    const totalScore = student.subjects.reduce(
      (sum, subject) => sum + subject.score,
      0,
    );
    student.GPA = parseFloat((totalScore / student.subjects.length).toFixed(2));

    await student.save();
    return student;
  }

  // Cập nhật điểm môn học
  async updateSubjectScore(
    id: string,
    subjectName: string,
    newScore: number,
  ): Promise<Student> {
    const student = await this.studentModel.findOne({ id });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    if (newScore < 0 || newScore > 10 || newScore % 0.25 !== 0) {
      throw new Error(
        'Invalid score. Score must be between 0 and 10, in increments of 0.25.',
      );
    }

    const subject = student.subjects.find((sub) => sub.name === subjectName);
    if (!subject) {
      throw new NotFoundException(`Subject with name ${subjectName} not found`);
    }

    subject.score = newScore;

    const totalScore = student.subjects.reduce(
      (sum, subject) => sum + subject.score,
      0,
    );
    student.GPA = parseFloat((totalScore / student.subjects.length).toFixed(2));

    await student.save();
    return student;
  }

  // Xóa môn học
  async removeSubject(id: string, subjectName: string): Promise<Student> {
    const student = await this.studentModel.findOne({ id });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    // Tìm và xóa môn học khỏi mảng subjects
    const subjectIndex = student.subjects.findIndex(
      (sub) => sub.name === subjectName,
    );
    if (subjectIndex === -1) {
      throw new NotFoundException(`Subject with name ${subjectName} not found`);
    }

    student.subjects.splice(subjectIndex, 1); // Xóa môn học

    // Tính lại GPA sau khi xóa môn học
    const totalScore = student.subjects.reduce(
      (sum, subject) => sum + subject.score,
      0,
    );
    student.GPA =
      student.subjects.length > 0
        ? parseFloat((totalScore / student.subjects.length).toFixed(2))
        : 0;

    // Lưu lại sinh viên với thông tin mới
    await student.save();
    return student;
  }
}
