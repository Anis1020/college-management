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
exports.EnrolledCourseController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const services_1 = require("./services");
const createEnrolledCourse = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user.userId;
    const result = yield services_1.EnrolledCourseServices.createEnrolledCourseIntoDB(user, req.body);
    res.status(200).json({
        success: true,
        message: "enrolled Course created successfully",
        data: result,
    });
}));
const getAllEnrolledCourse = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield services_1.EnrolledCourseServices.getAllEnrolledCourseIntoDB(req.body);
    res.status(200).json({
        success: true,
        message: "all enrolled Course get successfully",
        data: result,
    });
}));
const getSingleEnrolledCourse = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield services_1.EnrolledCourseServices.getSingleEnrolledCourseIntoDB(id);
    res.status(200).json({
        success: true,
        message: "enrolled Course created successfully",
        data: result,
    });
}));
exports.EnrolledCourseController = {
    createEnrolledCourse,
    getAllEnrolledCourse,
    getSingleEnrolledCourse,
};
