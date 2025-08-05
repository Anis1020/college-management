"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferedCourseModel = exports.Days = void 0;
const mongoose_1 = require("mongoose");
exports.Days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
const offeredCourseSchema = new mongoose_1.Schema({
    semesterRegistration: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "SemesterRegistration",
    },
    academicSemester: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Semester",
    },
    academicFaculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "AcademicFaculty",
    },
    academicDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Department",
    },
    course: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Course",
    },
    faculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Faculty",
    },
    maxCapacity: {
        type: Number,
        required: true,
        default: 10,
    },
    section: {
        type: Number,
        required: true,
    },
    days: [
        {
            type: String,
            enum: exports.Days,
        },
    ],
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.OfferedCourseModel = (0, mongoose_1.model)("OfferedCourse", offeredCourseSchema);
