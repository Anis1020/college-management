"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyModel = void 0;
const mongoose_1 = require("mongoose");
const facultySchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        unique: true,
        required: true,
        ref: "User",
    },
    name: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
    },
    designation: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: true,
    },
    dateOfBirth: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    contactNo: {
        type: String,
        required: true,
    },
    presentAddress: {
        type: String,
        required: true,
    },
    permanentAddress: {
        type: String,
        required: true,
    },
    guardian: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        relation: {
            type: String,
            required: true,
        },
        occupation: {
            type: String,
            required: true,
        },
    },
    localGuardian: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        relation: {
            type: String,
            required: true,
        },
        occupation: {
            type: String,
            required: true,
        },
    },
    profileImg: {
        type: String,
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
}, {
    timestamps: true,
});
exports.FacultyModel = (0, mongoose_1.model)("Faculty", facultySchema);
