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
const utils_1 = require("./utils");
const createOfferedCourseIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { semesterRegistration, academicFaculty, academicDepartment, faculty, course, section, days, startTime, endTime, } = payload;
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
    const isTheDepartmentBelongToFaculty = yield schemaModel_3.DepartmentModel.findOne({
        _id: academicDepartment,
        academicFaculty,
    });
    if (!isTheDepartmentBelongToFaculty) {
        throw new AppError_1.default(400, `this department of ${isAcademicDepartmentExist.name} is not belong to this ${isAcademicFacultyExist.name}`);
    }
    const isSameOfferedCourse_SemesterRegistration_Section_Exist = yield schemaModel_6.OfferedCourseModel.findOne({
        semesterRegistration,
        course,
        section,
    });
    if (isSameOfferedCourse_SemesterRegistration_Section_Exist) {
        throw new AppError_1.default(400, `Offered course with same section already exist`);
    }
    const assignedSchedules = yield schemaModel_6.OfferedCourseModel.find({
        semesterRegistration,
        faculty,
        days: { $in: days },
    }).select("days startTime endTime");
    const newSchedules = {
        days,
        startTime,
        endTime,
    };
    if ((0, utils_1.timeConflict)(assignedSchedules, newSchedules)) {
        throw new AppError_1.default(400, `this faculty is not available at this time choose other time or day`);
    }
    // const result = await OfferedCourseModel.create({
    //   ...payload,
    //   academicSemester,
    // });
    return null;
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
    const { faculty, days, startTime, endTime } = payload;
    const isOfferedCourseExist = yield schemaModel_6.OfferedCourseModel.findById(id);
    if (!isOfferedCourseExist) {
        throw new AppError_1.default(400, "this offered course not found");
    }
    const isFacultyExist = yield schemaModel_4.FacultyModel.findById(faculty);
    if (!isFacultyExist) {
        throw new AppError_1.default(400, "faculty not found");
    }
    const semesterRegistration = isOfferedCourseExist.semesterRegistration;
    const semesterRegistrationStatus = yield schemaModel_5.SemesterRegistrationModel.findById(semesterRegistration);
    if ((semesterRegistrationStatus === null || semesterRegistrationStatus === void 0 ? void 0 : semesterRegistrationStatus.status) !== "UPCOMING") {
        throw new AppError_1.default(400, "now you can not update this offered course");
    }
    const assignedSchedules = yield schemaModel_6.OfferedCourseModel.find({
        semesterRegistration,
        faculty,
        days: { $in: days },
    }).select("days startTime endTime");
    const newSchedules = {
        days,
        startTime,
        endTime,
    };
    if ((0, utils_1.timeConflict)(assignedSchedules, newSchedules)) {
        throw new AppError_1.default(400, `this faculty is not available at this time choose other time or day`);
    }
    const result = yield schemaModel_6.OfferedCourseModel.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
exports.OfferedCourseServices = {
    createOfferedCourseIntoDB,
    getAllOfferedCourseIntoDB,
    getSingleOfferedCourseIntoDB,
    updateOfferedCourseIntoDB,
};
