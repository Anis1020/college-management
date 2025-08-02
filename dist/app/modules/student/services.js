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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schemaModel_1 = require("./schemaModel");
const schemaModel_2 = require("../user/schemaModel");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const constant_1 = require("./constant");
const getAllStudentsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    //
    // const queryOBJ = { ...query };
    // const studentSearchableField = ["email", "name.firstName", "presentAddress"];
    // let searchTerm = "";
    // if (query?.searchTerm) {
    //   searchTerm = query?.searchTerm as string;
    // }
    // const searchQuery = StudentModel.find({
    //   $or: studentSearchableField.map((field) => ({
    //     [field]: { $regex: searchTerm, $option: "i" },
    //   })),
    // });
    // //filtering
    // const excludeField = ["searchTerm", "sort", "limit", "page", "fields"];
    // excludeField.forEach((el) => delete queryOBJ[el]);
    // const filterQuery = searchQuery
    //   .find(queryOBJ)
    //   .populate("admissionSemester")
    //   .populate({
    //     path: "academicDepartment",
    //     populate: {
    //       path: "academicFaculty",
    //     },
    //   });
    // let sort = "-createdAt";
    // if (query.sort) {
    //   sort = query.sort as string;
    // }
    // const sortQuery = filterQuery.sort(sort);
    // let page = 1;
    // let limit = 1;
    // let skip = 0;
    // if (query?.limit) {
    //   limit = Number(query.limit);
    //   skip = (page - 1) * limit;
    // }
    // const paginateQuery = sortQuery.skip(skip);
    // if (query?.page) {
    //   page = Number(query.page);
    // }
    // const limitQuery = paginateQuery.limit(limit);
    //fields limiting
    // let fields = "-__v";
    // if (query?.fields) {
    //   fields = (query.fields as string).split(",").join(" ");
    // }
    // const fieldQuery = await limitQuery.select(fields);
    // return fieldQuery;
    const studentQuery = new QueryBuilder_1.default(schemaModel_1.StudentModel.find(), query)
        .search(constant_1.studentSearchableField)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield studentQuery.modelQuery;
    return result;
});
const getSingleStudentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // const result = await StudentModel.aggregate([{ $match: { id } }]);
    const result = yield schemaModel_1.StudentModel.findOne({ id })
        .populate("admissionSemester")
        .populate({
        path: "academicDepartment",
        populate: {
            path: "academicFaculty",
        },
    });
    return result;
});
const updateStudentFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, guardian, localGuardian } = payload, remainingStudentData = __rest(payload, ["name", "guardian", "localGuardian"]);
    const modifiedUpdatedData = Object.assign({}, remainingStudentData);
    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedData[`name.${key}`] = value;
        }
    }
    if (guardian && Object.keys(guardian).length) {
        for (const [key, value] of Object.entries(guardian)) {
            modifiedUpdatedData[`guardian.${key}`] = value;
        }
    }
    if (localGuardian && Object.keys(localGuardian).length) {
        for (const [key, value] of Object.entries(localGuardian)) {
            modifiedUpdatedData[`localGuardian.${key}`] = value;
        }
    }
    const result = yield schemaModel_1.StudentModel.findOneAndUpdate({ id }, modifiedUpdatedData, {
        new: true,
    });
    return result;
});
const deleteStudentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const deletedUser = yield schemaModel_2.UserModel.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        if (!deletedUser) {
            throw new AppError_1.default(404, "Fain to delete user");
        }
        const deleteStudent = yield schemaModel_1.StudentModel.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        if (!deleteStudent) {
            throw new AppError_1.default(404, "Fail to delete student");
        }
        yield session.commitTransaction();
        session.endSession;
        return {
            message: "Student and associated user deleted successfully",
            success: true,
        };
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession;
        throw new AppError_1.default(404, "fail to delete user or student");
    }
});
exports.StudentServices = {
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    updateStudentFromDB,
    deleteStudentFromDB,
};
