import { Types } from "mongoose";

export type TCourseMark = {
  classTest1: number;
  midTerm: number;
  classTest2: number;
  finalTerm: number;
};
export type TGrade = "A" | "B" | "C" | "D" | "F" | "NA";
export type TEnrolledCourse = {
  semesterRegistration: Types.ObjectId;
  academicSemester: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  course: Types.ObjectId;
  offeredCourse: Types.ObjectId;
  faculty: Types.ObjectId;
  student: Types.ObjectId;
  isEnrolled: boolean;
  courseMark: TCourseMark;
  grade: TGrade;
  gradePoint: number;
  isCompleted: boolean;
};
