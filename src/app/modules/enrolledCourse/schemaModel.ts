import { model, Schema } from "mongoose";
import { TCourseMark, TEnrolledCourse } from "./interface";

const courseMarkSchema = new Schema<TCourseMark>(
  {
    classTest1: {
      type: Number,
      default: 0,
    },
    midTerm: {
      type: Number,
      default: 0,
    },
    classTest2: {
      type: Number,
      default: 0,
    },
    finalTerm: {
      type: Number,
      default: 0,
    },
  },
  {
    _id: false,
  }
);

const enrolledCourseSchema = new Schema<TEnrolledCourse>(
  {
    semesterRegistration: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "SemesterRegistration",
      trim: true,
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Semester",
      trim: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "AcademicFaculty",
      trim: true,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Department",
      trim: true,
    },
    offeredCourse: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "OfferedCourse",
      trim: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Course",
      trim: true,
    },
    faculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Faculty",
      trim: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Student",
      trim: true,
    },
    isEnrolled: {
      type: Boolean,
      default: false,
    },
    courseMark: {
      type: courseMarkSchema,
      default: {},
    },
    grade: {
      type: String,
      enum: ["A", "B", "C", "D", "F", "NA"],
      default: "NA",
    },
    gradePoint: {
      type: Number,
      min: 0,
      max: 4,
      default: 0,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const EnrolledCourseModel = model<TEnrolledCourse>(
  "EnrolledCourse",
  enrolledCourseSchema
);
