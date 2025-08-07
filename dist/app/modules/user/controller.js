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
exports.UserController = void 0;
const services_1 = require("./services");
const catchAsync_1 = require("../../utils/catchAsync");
const createStudent = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, student } = req.body;
    const result = yield services_1.UserServices.createStudentIntoDB(password, student);
    res.status(200).json({
        success: true,
        message: "Student created successfully",
        data: result,
    });
}));
const createFaculty = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = req.params;
    const result = yield services_1.UserServices.createFacultyIntoDB(password, req.body);
    res.status(200).json({
        success: true,
        message: "Faculty created successfully",
        data: result,
    });
}));
const createAdmin = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = req.params;
    const result = yield services_1.UserServices.createAdminIntoDB(password, req.body);
    res.status(200).json({
        success: true,
        message: "admin created successfully",
        data: result,
    });
}));
const getMe = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, role } = req.user;
    const result = yield services_1.UserServices.getMe(userId, role);
    res.status(200).json({
        success: true,
        message: "User is retrieved successfully",
        data: result,
    });
}));
const changeStatus = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield services_1.UserServices.changeStatus(id, req.body);
    res.status(200).json({
        success: true,
        message: "User Status is update successfully",
        data: result,
    });
}));
exports.UserController = {
    createStudent,
    createFaculty,
    createAdmin,
    getMe,
    changeStatus,
};
