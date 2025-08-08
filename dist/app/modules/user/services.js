"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schemaModel_1 = require("../student/schemaModel");
const schemaModel_2 = require("./schemaModel");
const schemaModel_3 = require("../semester/schemaModel");
const utils_1 = require("./utils");
const config_1 = require("../../config");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const schemaModel_4 = require("../faculty/schemaModel");
const schemaModel_5 = require("../admin/schemaModel");
const createStudentIntoDB = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    //if data already exist then stop to create
    const isUserExists = yield schemaModel_1.StudentModel.findOne({ email: payload.email });
    if (isUserExists) {
        throw new Error("this user already exist in db");
    }
    const userData = {};
    userData.password = password || config_1.config.default_pass;
    userData.role = "student";
    userData.email = payload.email;
    const admissionSemester = yield schemaModel_3.SemesterModel.findById(payload.admissionSemester);
    if (!admissionSemester) {
        throw new Error("Admission semester not found");
    }
    userData.id = yield (0, utils_1.generatedId)(admissionSemester);
    //checking is user already exist or not using mongoose statics methods
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //upload image to cloudinary
        const newUser = yield schemaModel_2.UserModel.create([userData], { session });
        if (!newUser.length) {
            throw new AppError_1.default(404, "fail to create user");
        }
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id;
        // payload.email = newUser.email;
        const result = yield schemaModel_1.StudentModel.create([payload], { session });
        if (!result.length) {
            throw new AppError_1.default(404, "fail to create student");
        }
        yield session.commitTransaction();
        yield session.endSession();
        return result;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error("Failed to create user and student");
    }
});
//create faculty
const createFacultyIntoDB = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const UserData = {};
    UserData.role = "faculty";
    UserData.email = payload.email;
    UserData.password = password || config_1.config.default_pass;
    UserData.id = yield (0, utils_1.generatedFacultyId)();
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const newUser = yield schemaModel_2.UserModel.create([UserData], { session });
        if (!newUser.length) {
            throw new Error("fail to create user");
        }
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id;
        const result = yield schemaModel_4.FacultyModel.create([payload], { session });
        yield session.commitTransaction();
        yield session.endSession();
        return result;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(error.message);
    }
});
//create admin
const createAdminIntoDB = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = {};
    userData.password = password || config_1.config.default_pass;
    userData.role = "admin";
    userData.email = payload.email;
    userData.id = yield (0, utils_1.generatedAdminId)();
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const newUser = yield schemaModel_2.UserModel.create([userData], { session });
        if (!newUser.length) {
            throw new Error("fail to create user");
        }
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id;
        const newAdmin = yield schemaModel_5.AdminModel.create([payload], { session });
        yield session.commitTransaction();
        yield session.endSession();
        return newAdmin;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(error.massage);
    }
});
const getMe = (userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    let result = null;
    if (role === "student") {
        result = yield schemaModel_1.StudentModel.findOne({ id: userId }).populate("user");
    }
    if (role === "faculty") {
        result = yield schemaModel_4.FacultyModel.findOne({ id: userId }).populate("user");
    }
    if (role === "admin") {
        result = yield schemaModel_5.AdminModel.findOne({ id: userId }).populate("user");
    }
    return result;
});
const changeStatus = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield schemaModel_2.UserModel.findByIdAndUpdate(id, { payload }, { new: true });
    return result;
});
exports.UserServices = {
    createStudentIntoDB,
    createFacultyIntoDB,
    createAdminIntoDB,
    getMe,
    changeStatus,
};
