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
        required: [true, "Start time is required."],
        validate: {
            validator: (v) => {
                // Regular expression to validate HH:mm time format
                return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
            },
            message: (props) => `${props.value} is not a valid time format (HH:mm)!`,
        },
    },
    endTime: {
        type: String,
        required: [true, "End time is required."],
        validate: {
            validator: (v) => {
                // Regular expression to validate HH:mm time format
                return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
            },
            message: (props) => `${props.value} is not a valid time format (HH:mm)!`,
        },
    },
}, {
    timestamps: true,
});
// Use a pre-middleware hook to validate that the start time is before the end time
offeredCourseSchema.pre("validate", function (next) {
    // Convert string times to Date objects for comparison
    const [startHour, startMinute] = this.startTime.split(":").map(Number);
    const [endHour, endMinute] = this.endTime.split(":").map(Number);
    const startDate = new Date();
    startDate.setHours(startHour, startMinute, 0, 0);
    const endDate = new Date();
    endDate.setHours(endHour, endMinute, 0, 0);
    // Check if the start time is not after or equal to the end time
    if (startDate >= endDate) {
        this.invalidate("startTime", "Start time must be before end time.");
    }
    next();
});
exports.OfferedCourseModel = (0, mongoose_1.model)("OfferedCourse", offeredCourseSchema);
