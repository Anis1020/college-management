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
const createStudentIntoDB = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // if (await StudentModel.isUserExists(payload.id)) {
    //   throw new Error("user already exist ");
    // }
    const userData = {};
    userData.password = password || config_1.config.default_pass;
    userData.role = "student";
    const admissionSemester = yield schemaModel_3.SemesterModel.findById(payload.admissionSemester);
    if (!admissionSemester) {
        throw new Error("Admission semester not found");
    }
    userData.id = yield (0, utils_1.generatedId)(admissionSemester);
    //checking is user already exist or not using mongoose statics methods
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const newUser = yield schemaModel_2.UserModel.create([userData], { session });
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id;
        // payload.email = newUser.email;
        const result = yield schemaModel_1.StudentModel.create([payload], { session });
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
exports.UserServices = {
    createStudentIntoDB,
};
