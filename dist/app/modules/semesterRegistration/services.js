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
exports.SemesterRegistrationServices = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const schemaModel_1 = require("../semester/schemaModel");
const schemaModel_2 = require("./schemaModel");
const createSemesterRegistrationIntoD = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const academicSemester = payload === null || payload === void 0 ? void 0 : payload.academicSemester;
    const isThereAnyUpcomingOrOngoingSemester = yield schemaModel_2.SemesterRegistrationModel.findOne({
        $or: [{ status: "UPCOMING" }, { status: "ONGOING" }],
    });
    if (isThereAnyUpcomingOrOngoingSemester) {
        throw new AppError_1.default(400, `There is already a ${isThereAnyUpcomingOrOngoingSemester.status} course ready `);
    }
    //check this semester exist or not
    const isAcademicSemesterExists = yield schemaModel_1.SemesterModel.findById(academicSemester);
    if (!isAcademicSemesterExists) {
        throw new AppError_1.default(400, "Semester dost not found");
    }
    //check this semester already exist or not
    const isSemesterRegistrationExists = yield schemaModel_2.SemesterRegistrationModel.findOne({
        academicSemester,
    });
    if (isSemesterRegistrationExists) {
        throw new AppError_1.default(404, "this semester registration already exist");
    }
    const result = yield schemaModel_2.SemesterRegistrationModel.create(payload);
    return result;
});
const getAllSemesterRegistrationIntoD = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield schemaModel_2.SemesterRegistrationModel.find();
    return result;
});
const getSingleSemesterRegistrationIntoD = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield schemaModel_2.SemesterRegistrationModel.findById(id);
    return result;
});
const updateSemesterRegistrationIntoD = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isSemesterRegistrationExists = yield schemaModel_2.SemesterRegistrationModel.findByIdAndUpdate(id);
    if (!isSemesterRegistrationExists) {
        throw new AppError_1.default(400, "");
    }
    const currentSemesterStatus = isSemesterRegistrationExists === null || isSemesterRegistrationExists === void 0 ? void 0 : isSemesterRegistrationExists.status;
    if (currentSemesterStatus === "ENDED") {
        throw new AppError_1.default(404, `semester already ended`);
    }
    return isSemesterRegistrationExists;
});
exports.SemesterRegistrationServices = {
    createSemesterRegistrationIntoD,
    getAllSemesterRegistrationIntoD,
    getSingleSemesterRegistrationIntoD,
    updateSemesterRegistrationIntoD,
};
