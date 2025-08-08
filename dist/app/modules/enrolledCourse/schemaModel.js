"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrolledCourseModel = void 0;
const mongoose_1 = require("mongoose");
const courseMarkSchema = new mongoose_1.Schema({
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
}, {
    _id: false,
});
const enrolledCourseSchema = new mongoose_1.Schema({
    semesterRegistration: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "SemesterRegistration",
        trim: true,
    },
    academicSemester: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Semester",
        trim: true,
    },
    academicFaculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "AcademicFaculty",
        trim: true,
    },
    academicDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Department",
        trim: true,
    },
    offeredCourse: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "OfferedCourse",
        trim: true,
    },
    course: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Course",
        trim: true,
    },
    faculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Faculty",
        trim: true,
    },
    student: {
        type: mongoose_1.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
});
exports.EnrolledCourseModel = (0, mongoose_1.model)("EnrolledCourse", enrolledCourseSchema);
