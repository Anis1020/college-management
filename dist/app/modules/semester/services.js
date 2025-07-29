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
exports.SemesterService = void 0;
const constant_1 = require("./constant");
const schemaModel_1 = require("./schemaModel");
const createSemesterIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //semester name =semester code
    if (constant_1.semesterNameCodeMapper[payload.name] !== payload.code) {
        throw new Error("invalid semester name or code");
    }
    const result = yield schemaModel_1.SemesterModel.create(payload);
    return result;
});
const getAllSemesterFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield schemaModel_1.SemesterModel.find();
    return result;
});
const getSingleSemesterFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield schemaModel_1.SemesterModel.findById(id);
    return result;
});
const updateSemesterFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.name &&
        payload.code &&
        constant_1.semesterNameCodeMapper[payload.name] !== payload.code) {
        throw new Error("invalid semester name or code");
    }
    const result = yield schemaModel_1.SemesterModel.findByIdAndUpdate(id, payload);
    return result;
});
exports.SemesterService = {
    createSemesterIntoDB,
    getAllSemesterFromDB,
    getSingleSemesterFromDB,
    updateSemesterFromDB,
};
