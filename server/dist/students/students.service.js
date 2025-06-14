"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const student_entity_1 = require("./entities/student.entity");
let StudentsService = class StudentsService {
    studentModel;
    constructor(studentModel) {
        this.studentModel = studentModel;
    }
    async create(createStudentDto) {
        const createdStudent = new this.studentModel(createStudentDto);
        return createdStudent.save();
    }
    async findAll() {
        return this.studentModel.find().exec();
    }
    async findOne(id) {
        const student = await this.studentModel.findOne({ id }).exec();
        if (!student) {
            throw new common_1.NotFoundException(`Student with ID ${id} not found`);
        }
        return student;
    }
    async update(id, updateStudentDto) {
        const updatedStudent = await this.studentModel.findOneAndUpdate({ id }, updateStudentDto, { new: true }).exec();
        if (!updatedStudent) {
            throw new common_1.NotFoundException(`Student with ID ${id} not found`);
        }
        return updatedStudent;
    }
    async remove(id) {
        const result = await this.studentModel.findOneAndDelete({ id }).exec();
        if (!result) {
            throw new common_1.NotFoundException(`Student with ID ${id} not found`);
        }
    }
    async addSubject(id, subjectData) {
        const student = await this.studentModel.findOne({ id });
        if (!student) {
            throw new common_1.NotFoundException(`Student with ID ${id} not found`);
        }
        student.subjects.push(subjectData);
        const totalScore = student.subjects.reduce((sum, subject) => sum + subject.score, 0);
        student.GPA = parseFloat((totalScore / student.subjects.length).toFixed(2));
        await student.save();
        return student;
    }
    async updateSubjectScore(id, subjectName, newScore) {
        const student = await this.studentModel.findOne({ id });
        if (!student) {
            throw new common_1.NotFoundException(`Student with ID ${id} not found`);
        }
        if (newScore < 0 || newScore > 10 || newScore % 0.25 !== 0) {
            throw new Error('Invalid score. Score must be between 0 and 10, in increments of 0.25.');
        }
        const subject = student.subjects.find(sub => sub.name === subjectName);
        if (!subject) {
            throw new common_1.NotFoundException(`Subject with name ${subjectName} not found`);
        }
        subject.score = newScore;
        const totalScore = student.subjects.reduce((sum, subject) => sum + subject.score, 0);
        student.GPA = parseFloat((totalScore / student.subjects.length).toFixed(2));
        await student.save();
        return student;
    }
    async removeSubject(id, subjectName) {
        const student = await this.studentModel.findOne({ id });
        if (!student) {
            throw new common_1.NotFoundException(`Student with ID ${id} not found`);
        }
        const subjectIndex = student.subjects.findIndex(sub => sub.name === subjectName);
        if (subjectIndex === -1) {
            throw new common_1.NotFoundException(`Subject with name ${subjectName} not found`);
        }
        student.subjects.splice(subjectIndex, 1);
        const totalScore = student.subjects.reduce((sum, subject) => sum + subject.score, 0);
        student.GPA = student.subjects.length > 0 ? parseFloat((totalScore / student.subjects.length).toFixed(2)) : 0;
        await student.save();
        return student;
    }
};
exports.StudentsService = StudentsService;
exports.StudentsService = StudentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(student_entity_1.Student.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], StudentsService);
//# sourceMappingURL=students.service.js.map