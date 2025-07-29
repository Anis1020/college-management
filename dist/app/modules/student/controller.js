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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const services_1 = require("./services");
const getAllStudent = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield services_1.StudentServices.getAllStudentsFromDB();
    res.status(200).json({
        success: true,
        message: "Students retrieved successfully",
        data: result,
    });
}));
const getSingleStudent = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield services_1.StudentServices.getSingleStudentFromDB(id);
    res.status(200).json({
        success: true,
        message: "Student retrieved successfully",
        data: result,
    });
}));
const updateStudent = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield services_1.StudentServices.updateStudentFromDB(id, req.body);
    res.status(200).json({
        success: true,
        message: "Student updated successfully",
        data: result,
    });
}));
const deleteStudent = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield services_1.StudentServices.deleteStudentFromDB(id);
    res.status(200).json({
        success: true,
        message: "Student deleted successfully",
        data: result,
    });
}));
exports.StudentController = {
    getAllStudent,
    getSingleStudent,
    updateStudent,
    deleteStudent,
};
