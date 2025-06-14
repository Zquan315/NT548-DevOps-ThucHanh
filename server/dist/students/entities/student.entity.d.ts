import { Document } from 'mongoose';
export declare class Student extends Document {
    id: string;
    name: string;
    major: string;
    GPA: number;
    subjects: {
        name: string;
        score: number;
    }[];
}
export declare const StudentSchema: import("mongoose").Schema<Student, import("mongoose").Model<Student, any, any, any, Document<unknown, any, Student> & Student & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Student, Document<unknown, {}, import("mongoose").FlatRecord<Student>> & import("mongoose").FlatRecord<Student> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
