import { Test, TestingModule } from '@nestjs/testing';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { NotFoundException } from '@nestjs/common';

describe('StudentsController', () => {
  let controller: StudentsController;

  // Mô phỏng StudentsService
  const mockStudentsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    addSubject: jest.fn(),
    updateSubjectScore: jest.fn(),
    removeSubject: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsController],
      providers: [
        {
          provide: StudentsService,
          useValue: mockStudentsService, // Sử dụng mock service
        },
      ],
    }).compile();

    controller = module.get<StudentsController>(StudentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Test phương thức `create`
  it('should create a student', async () => {
    const createStudentDto = {
      id: '1',
      name: 'John Doe',
      age: 20,
      major: 'Computer Science',
      GPA: 0,
      subjects: [],
    };
    mockStudentsService.create.mockResolvedValue(createStudentDto);

    expect(await controller.create(createStudentDto)).toEqual(createStudentDto);
    expect(mockStudentsService.create).toHaveBeenCalledWith(createStudentDto);
  });

  // Test phương thức `findAll`
  it('should return an array of students', async () => {
    const result = [{ name: 'John Doe', age: 20 }];
    mockStudentsService.findAll.mockResolvedValue(result);

    expect(await controller.findAll()).toBe(result);
    expect(mockStudentsService.findAll).toHaveBeenCalled();
  });

  // Test phương thức `findOne`
  it('should return a student by id', async () => {
    const result = { name: 'John Doe', age: 20 };
    mockStudentsService.findOne.mockResolvedValue(result);

    expect(await controller.findOne('1')).toBe(result);
    expect(mockStudentsService.findOne).toHaveBeenCalledWith('1');
  });

  it('should throw NotFoundException if student not found', async () => {
    mockStudentsService.findOne.mockRejectedValue(
      new NotFoundException('Student not found'),
    );

    await expect(controller.findOne('non-existent-id')).rejects.toThrow(
      NotFoundException,
    );
  });

  // Test phương thức `update`
  it('should update a student', async () => {
    const updateStudentDto = { name: 'John Doe', age: 21 };
    const result = { name: 'John Doe', age: 21 };
    mockStudentsService.update.mockResolvedValue(result);

    expect(await controller.update('1', updateStudentDto)).toBe(result);
    expect(mockStudentsService.update).toHaveBeenCalledWith(
      '1',
      updateStudentDto,
    );
  });

  // Test phương thức `remove`
  it('should remove a student', async () => {
    mockStudentsService.remove.mockResolvedValue(undefined);

    await expect(controller.remove('1')).resolves.toBeUndefined();
    expect(mockStudentsService.remove).toHaveBeenCalledWith('1');
  });

  // Test phương thức `addSubject`
  it('should add a subject to student', async () => {
    const subjectData = { name: 'Math', score: 8 };
    const result = { name: 'John Doe', subjects: [subjectData] };
    mockStudentsService.addSubject.mockResolvedValue(result);

    expect(await controller.addSubject('1', subjectData)).toBe(result);
    expect(mockStudentsService.addSubject).toHaveBeenCalledWith(
      '1',
      subjectData,
    );
  });

  // Test phương thức `updateSubjectScore`
  it('should update a subject score for student', async () => {
    const subjectName = 'Math';
    const newScore = { score: 9 };
    const result = { name: 'John Doe', subjects: [{ name: 'Math', score: 9 }] };
    mockStudentsService.updateSubjectScore.mockResolvedValue(result);

    expect(
      await controller.updateSubjectScore('1', subjectName, newScore),
    ).toBe(result);
    expect(mockStudentsService.updateSubjectScore).toHaveBeenCalledWith(
      '1',
      subjectName,
      newScore.score,
    );
  });

  // Test phương thức `removeSubject`
  it('should remove a subject from student', async () => {
    const subjectName = 'Math';
    const result = { name: 'John Doe', subjects: [] };
    mockStudentsService.removeSubject.mockResolvedValue(result);

    expect(await controller.removeSubject('1', subjectName)).toBe(result);
    expect(mockStudentsService.removeSubject).toHaveBeenCalledWith(
      '1',
      subjectName,
    );
  });
});
