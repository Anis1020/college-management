"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemesterRegistration = void 0;
const mongoose_1 = require("mongoose");
const semesterRegistrationSchema = new mongoose_1.Schema({
    academicSemester: {
        type: mongoose_1.Schema.Types.ObjectId,
        unique: true,
        required: true,
        ref: "Semester",
    },
    status: {
        type: String,
        enum: ["UPCOMING", "ONGOING", "ENDED"],
        default: "UPCOMING",
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    minCredit: {
        type: Number,
        required: true,
    },
    maxCredit: {
        type: Number,
        required: true,
    },
});
exports.SemesterRegistration = (0, mongoose_1.model)("SemesterRegistration", semesterRegistrationSchema);
