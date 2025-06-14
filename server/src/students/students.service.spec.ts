import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';
import { getModelToken } from '@nestjs/mongoose'; // Sử dụng để mock model trong bài kiểm tra
import { Student } from './entities/student.entity';

describe('StudentsService', () => {
  let service: StudentsService;

  // Mô phỏng các phương thức của Mongoose Model
  const mockStudentModel = {
    findOne: jest.fn().mockReturnThis(),
    find: jest.fn().mockReturnThis(),
    create: jest.fn(),
    save: jest.fn(),
    findOneAndUpdate: jest.fn().mockReturnThis(),
    findOneAndDelete: jest.fn().mockReturnThis(),
    exec: jest.fn(), // Mock exec để tránh lỗi
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        {
          provide: getModelToken(Student.name),
          useValue: mockStudentModel, // Mock model Student
        },
      ],
    }).compile();

    service = module.get<StudentsService>(StudentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined(); // Kiểm tra xem service có được khởi tạo không
  });
});
