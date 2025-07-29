"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemesterModel = void 0;
const mongoose_1 = require("mongoose");
const Months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
];
const semesterSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        enum: ["01", "02", "03", "04"],
    },
    startMonth: {
        type: String,
        required: true,
        enum: Months,
    },
    endMonth: {
        type: String,
        required: true,
        enum: Months,
    },
}, {
    timestamps: true,
});
exports.SemesterModel = (0, mongoose_1.model)("Semester", semesterSchema);
