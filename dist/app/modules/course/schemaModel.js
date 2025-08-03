"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModel = void 0;
const mongoose_1 = require("mongoose");
const preRequisiteCoursesSchema = new mongoose_1.Schema({
    course: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});
const courseSchema = new mongoose_1.Schema({
    title: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    prefix: {
        type: String,
        required: true,
        trim: true,
    },
    code: {
        type: Number,
        required: true,
        trim: true,
    },
    credits: {
        type: Number,
        required: true,
        trim: true,
    },
    preRequisiteCourses: [preRequisiteCoursesSchema],
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});
exports.CourseModel = (0, mongoose_1.model)("Course", courseSchema);
