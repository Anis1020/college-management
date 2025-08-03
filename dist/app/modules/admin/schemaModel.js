"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModel = void 0;
const mongoose_1 = require("mongoose");
const NameSchema = {
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
};
const Guardians = {
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    occupation: {
        type: String,
        required: true,
    },
    relation: {
        type: String,
        required: true,
    },
};
const adminSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    name: NameSchema,
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
    guardian: Guardians,
    localGuardian: Guardians,
    profileImg: {
        type: String,
    },
    managementDepartment: {
        type: String,
        required: true,
    },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});
exports.AdminModel = (0, mongoose_1.model)("Admin", adminSchema);
