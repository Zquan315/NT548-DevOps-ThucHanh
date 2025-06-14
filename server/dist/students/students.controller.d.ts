import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
export declare class StudentsController {
    private readonly studentsService;
    constructor(studentsService: StudentsService);
    create(createStudentDto: CreateStudentDto): Promise<import("./entities/student.entity").Student>;
    findAll(): Promise<import("./entities/student.entity").Student[]>;
    findOne(id: string): Promise<import("./entities/student.entity").Student>;
    update(id: string, updateStudentDto: UpdateStudentDto): Promise<import("./entities/student.entity").Student>;
    remove(id: string): Promise<void>;
    addSubject(id: string, subjectData: {
        name: string;
        score: number;
    }): Promise<import("./entities/student.entity").Student>;
    updateSubjectScore(id: string, subjectName: string, newScore: {
        score: number;
    }): Promise<import("./entities/student.entity").Student>;
    removeSubject(id: string, subjectName: string): Promise<import("./entities/student.entity").Student>;
}
