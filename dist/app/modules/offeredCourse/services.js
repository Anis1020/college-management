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
exports.OfferedCourseServices = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const schemaModel_1 = require("../academicFaculty/schemaModel");
const schemaModel_2 = require("../course/schemaModel");
const schemaModel_3 = require("../department/schemaModel");
const schemaModel_4 = require("../faculty/schemaModel");
const schemaModel_5 = require("../semesterRegistration/schemaModel");
const schemaModel_6 = require("./schemaModel");
const createOfferedCourseIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { semesterRegistration, academicFaculty, academicDepartment, faculty, course, } = payload;
    //check all are valid or not
    const isSemesterRegistrationExist = yield schemaModel_5.SemesterRegistrationModel.findById(semesterRegistration);
    if (!isSemesterRegistrationExist) {
        throw new AppError_1.default(404, "semester registration not found");
    }
    const academicSemester = isSemesterRegistrationExist.academicSemester;
    const isAcademicFacultyExist = yield schemaModel_1.AcademicFacultyModel.findById(academicFaculty);
    if (!isAcademicFacultyExist) {
        throw new AppError_1.default(400, "academic faculty not found");
    }
    const isAcademicDepartmentExist = yield schemaModel_3.DepartmentModel.findById(academicDepartment);
    if (!isAcademicDepartmentExist) {
        throw new AppError_1.default(400, "academic department not fount");
    }
    const isCourseExist = yield schemaModel_2.CourseModel.findById(course);
    if (!isCourseExist) {
        throw new AppError_1.default(400, "course not found");
    }
    const isFacultyExist = yield schemaModel_4.FacultyModel.findById(faculty);
    if (!isFacultyExist) {
        throw new AppError_1.default(400, "faculty not found");
    }
    const result = yield schemaModel_6.OfferedCourseModel.create(Object.assign(Object.assign({}, payload), { academicSemester }));
    return result;
});
const getAllOfferedCourseIntoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield schemaModel_6.OfferedCourseModel.find();
    return result;
});
const getSingleOfferedCourseIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield schemaModel_6.OfferedCourseModel.findById(id);
    return result;
});
const updateOfferedCourseIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield schemaModel_6.OfferedCourseModel.findByIdAndUpdate(id, payload);
    return result;
});
exports.OfferedCourseServices = {
    createOfferedCourseIntoDB,
    getAllOfferedCourseIntoDB,
    getSingleOfferedCourseIntoDB,
    updateOfferedCourseIntoDB,
};
