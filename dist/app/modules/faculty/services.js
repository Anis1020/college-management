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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyServices = void 0;
const schemaModel_1 = require("./schemaModel");
const getAllFacultyFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield schemaModel_1.FacultyModel.find()
        .populate("academicFaculty")
        .populate({
        path: "academicDepartment",
        populate: {
            path: "academicFaculty",
        },
    });
    return result;
});
const getSingleFacultyFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield schemaModel_1.FacultyModel.findById(id)
        .populate("academicFaculty")
        .populate({
        path: "academicDepartment",
        populate: {
            path: "academicFaculty",
        },
    });
    return result;
});
const updateFacultyIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, guardian, localGuardian } = payload, restOfData = __rest(payload, ["name", "guardian", "localGuardian"]);
    const modifiedFacultyData = Object.assign({}, restOfData);
    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedFacultyData[`name.${key}`] = value;
        }
    }
    if (guardian && Object.keys(guardian).length) {
        for (const [key, value] of Object.entries(guardian)) {
            modifiedFacultyData[`guardian.${key}`] = value;
        }
    }
    if (localGuardian && Object.keys(localGuardian).length) {
        for (const [key, value] of Object.entries(localGuardian)) {
            modifiedFacultyData[`localGuardian.${key}`] = value;
        }
    }
    const result = yield schemaModel_1.FacultyModel.findByIdAndUpdate(id, payload);
    return result;
});
const deleteFacultyIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield schemaModel_1.FacultyModel.findByIdAndUpdate(id);
    return result;
});
exports.FacultyServices = {
    getAllFacultyFromDB,
    getSingleFacultyFromDB,
    updateFacultyIntoDB,
    deleteFacultyIntoDB,
};
