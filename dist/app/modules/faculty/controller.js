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
exports.FacultyController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const services_1 = require("./services");
const getAllFaculty = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield services_1.FacultyServices.getAllFacultyFromDB();
    res.status(200).json({
        success: true,
        message: "get all faculty",
        data: result,
    });
}));
const getSingleFaculty = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield services_1.FacultyServices.getSingleFacultyFromDB(id);
    res.status(200).json({
        success: true,
        message: "get single faculty",
        data: result,
    });
}));
const updateFaculty = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield services_1.FacultyServices.updateFacultyIntoDB(id, req.body);
    res.status(200).json({
        success: true,
        message: "faculty update successfully",
        data: result,
    });
}));
const deleteFaculty = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield services_1.FacultyServices.deleteFacultyIntoDB(id);
    res.status(200).json({
        success: true,
        message: "faculty deleted successfully",
        data: result,
    });
}));
exports.FacultyController = {
    getAllFaculty,
    getSingleFaculty,
    updateFaculty,
    deleteFaculty,
};
