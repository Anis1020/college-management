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
exports.AcademicFacultyController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const services_1 = require("./services");
const createAcademicFaculty = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield services_1.AcademicFacultyServices.createAcademicFacultyIntoDB(req.body);
    res.status(200).json({
        success: true,
        message: "Academic faculty created successfully",
        data: result,
    });
}));
const getAllAcademicFaculty = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield services_1.AcademicFacultyServices.getAllAcademicFacultyIntoDB();
    res.status(200).json({
        success: true,
        message: "Get all Academic faculty successfully",
        data: result,
    });
}));
const getSingleAcademicFaculty = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield services_1.AcademicFacultyServices.getSingleAcademicFaculty(id);
    res.status(200).json({
        success: true,
        message: "Get single Academic faculty successfully",
        data: result,
    });
}));
const updateAcademicFaculty = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield services_1.AcademicFacultyServices.updateAcademicFaculty(id, req.body);
    res.status(200).json({
        success: true,
        message: "Update Academic faculty successfully",
        data: result,
    });
}));
exports.AcademicFacultyController = {
    createAcademicFaculty,
    getAllAcademicFaculty,
    getSingleAcademicFaculty,
    updateAcademicFaculty,
};
