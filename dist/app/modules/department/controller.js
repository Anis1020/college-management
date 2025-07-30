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
exports.DepartmentController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const services_1 = require("./services");
const createDepartment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield services_1.DepartmentServices.createDepartmentIntoDB(req.body);
    res.status(200).json({
        success: true,
        message: "Department created successfully",
        data: result,
    });
}));
const getAllDepartment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield services_1.DepartmentServices.getAllDepartmentFromDB();
    res.status(200).json({
        success: true,
        message: "All Department get successfully",
        data: result,
    });
}));
const getSingleDepartment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield services_1.DepartmentServices.getSingleDepartmentFromDB(id);
    res.status(200).json({
        success: true,
        message: "get single Department successfully",
        data: result,
    });
}));
const updateDepartment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield services_1.DepartmentServices.updateDepartment(id, req.body);
    res.status(200).json({
        success: true,
        message: "update Department successfully",
        data: result,
    });
}));
exports.DepartmentController = {
    createDepartment,
    getAllDepartment,
    getSingleDepartment,
    updateDepartment,
};
