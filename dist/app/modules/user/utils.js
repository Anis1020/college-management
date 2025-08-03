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
exports.generatedFacultyId = exports.generatedId = void 0;
const schemaModel_1 = require("./schemaModel");
const findLastStudent = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastStudentId = yield schemaModel_1.UserModel.findOne({
        role: "student",
    }, {
        id: 1,
        _id: 0,
    }).sort({
        createdAt: -1,
    });
    return (lastStudentId === null || lastStudentId === void 0 ? void 0 : lastStudentId.id) ? lastStudentId === null || lastStudentId === void 0 ? void 0 : lastStudentId.id : undefined;
});
const generatedId = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    let currentId = (0).toString();
    const lastStudentId = yield findLastStudent();
    const lastStudentSemesterCode = lastStudentId === null || lastStudentId === void 0 ? void 0 : lastStudentId.substring(4, 6);
    const lastStudentSemesterYear = lastStudentId === null || lastStudentId === void 0 ? void 0 : lastStudentId.substring(0, 4);
    const currentSemesterCode = payload.code;
    const currentSemesterYear = payload.year;
    if (lastStudentId &&
        lastStudentSemesterCode === currentSemesterCode &&
        lastStudentSemesterYear === currentSemesterYear) {
        currentId = lastStudentId.substring(6);
    }
    let incrementId = (parseInt(currentId) + 1).toString();
    return `${currentSemesterYear}${currentSemesterCode}${incrementId.padStart(4, "0")}`;
});
exports.generatedId = generatedId;
//faculty id generate
const findLastFaculty = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastFacultyId = yield schemaModel_1.UserModel.findOne({
        role: "faculty",
    }, {
        id: 1,
        _id: 0,
    }).sort({
        createdAt: -1,
    });
    return (lastFacultyId === null || lastFacultyId === void 0 ? void 0 : lastFacultyId.id) ? lastFacultyId.id : undefined;
});
const generatedFacultyId = () => __awaiter(void 0, void 0, void 0, function* () {
    let currentId = (0).toString();
    const lastFacultyId = yield findLastFaculty();
    if (lastFacultyId) {
        currentId = lastFacultyId.substring(2);
    }
    const incrementId = (Number(currentId) + 1).toString();
    return `F-${incrementId.padStart(4, "0")}`;
});
exports.generatedFacultyId = generatedFacultyId;
