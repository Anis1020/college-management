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
exports.StudentServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schemaModel_1 = require("../student/schemaModel");
const schemaModel_2 = require("./schemaModel");
const createStudentIntoDB = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = {};
    userData.password = password;
    userData.role = "student";
    userData.id = "studentId";
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
        throw new Error("Failed to create student");
    }
});
exports.StudentServices = {
    createStudentIntoDB,
};
