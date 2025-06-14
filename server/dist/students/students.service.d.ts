import { Model } from 'mongoose';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
export declare class StudentsService {
    private studentModel;
    constructor(studentModel: Model<Student>);
    create(createStudentDto: CreateStudentDto): Promise<Student>;
    findAll(): Promise<Student[]>;
    findOne(id: string): Promise<Student>;
    update(id: string, updateStudentDto: UpdateStudentDto): Promise<Student>;
    remove(id: string): Promise<void>;
    addSubject(id: string, subjectData: {
        name: string;
        score: number;
    }): Promise<Student>;
    updateSubjectScore(id: string, subjectName: string, newScore: number): Promise<Student>;
    removeSubject(id: string, subjectName: string): Promise<Student>;
}
