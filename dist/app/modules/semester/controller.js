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
exports.SemesterControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const services_1 = require("./services");
const createSemester = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield services_1.SemesterService.createSemesterIntoDB(payload);
    res.status(201).json({
        success: true,
        message: "Semester created successfully",
        data: result,
    });
}));
const getAllSemester = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield services_1.SemesterService.getAllSemesterFromDB();
    res.status(200).json({
        success: true,
        message: "Semester get successfully",
        data: result,
    });
}));
const getSingleSemester = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield services_1.SemesterService.getSingleSemesterFromDB(id);
    res.status(200).json({
        success: true,
        message: "Single Semester get successfully",
        data: result,
    });
}));
const updateSemester = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield services_1.SemesterService.updateSemesterFromDB(id, req.body);
    res.status(200).json({
        success: true,
        message: "Update Semester  successfully",
        data: result,
    });
}));
exports.SemesterControllers = {
    createSemester,
    getAllSemester,
    getSingleSemester,
    updateSemester,
};
