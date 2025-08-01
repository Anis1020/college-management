"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModel = exports.LocalGuardian = exports.Guardian = void 0;
const mongoose_1 = require("mongoose");
exports.Guardian = {
    name: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
    },
    relation: { type: String, required: true },
    contactNo: { type: String, required: true },
};
exports.LocalGuardian = {
    name: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
    },
    relation: { type: String, required: true },
    contactNo: { type: String, required: true },
};
const studentSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    name: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
    },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    dateOfBirth: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: exports.Guardian,
    localGuardian: exports.LocalGuardian,
    profileImage: { type: String, optional: true },
    admissionSemester: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Semester",
        required: true,
    },
    academicDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Department",
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
//virtual
studentSchema.virtual("fullName").get(function () {
    var _a, _b;
    return `${(_a = this === null || this === void 0 ? void 0 : this.name) === null || _a === void 0 ? void 0 : _a.firstName} ${(_b = this === null || this === void 0 ? void 0 : this.name) === null || _b === void 0 ? void 0 : _b.lastName}`;
});
//skip which is update by isDeleted property
studentSchema.pre("find", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
studentSchema.pre("findOne", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
studentSchema.pre("aggregate", function (next) {
    this.pipeline().unshift({ $match: { isDeleted: "$ne:true" } });
    next();
});
exports.StudentModel = (0, mongoose_1.model)("Student", studentSchema);
