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
exports.StudentServices = void 0;
const schemaModel_1 = require("./schemaModel");
const schemaModel_2 = require("../user/schemaModel");
const getAllStudentsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield schemaModel_1.StudentModel.find();
    return result;
});
const getSingleStudentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // const result = await StudentModel.findById(id);
    const result = yield schemaModel_1.StudentModel.aggregate([{ $match: { id } }]);
    return result;
});
const updateStudentFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield schemaModel_1.StudentModel.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
const deleteStudentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedUser = yield schemaModel_2.UserModel.updateOne({ id }, { isDeleted: true });
    const deleteStudent = yield schemaModel_1.StudentModel.updateOne({ id }, { isDeleted: true });
    return {
        deletedUser,
        deleteStudent,
        message: "Student and associated user deleted successfully",
        success: true,
    };
});
exports.StudentServices = {
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    updateStudentFromDB,
    deleteStudentFromDB,
};
