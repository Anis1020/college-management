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
exports.CourseServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schemaModel_1 = require("./schemaModel");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const createCourseIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield schemaModel_1.CourseModel.create(payload);
    return result;
});
const getAllCoursesFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // const searchableFields = ["title", "prefix", "code"];
    // const queryCourse = new QueryBuilder(
    //   CourseModel.find().populate("preRequisiteCourses.course"),
    //   query
    // )
    //   .search(searchableFields)
    //   .filter()
    //   .sort()
    //   .paginate()
    //   .fields();
    // const result = await queryCourse.modelQuery;
    const result = yield schemaModel_1.CourseModel.find().populate("preRequisiteCourses.course");
    return result;
});
const getSingleCourseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield schemaModel_1.CourseModel.findById(id).populate("preRequisiteCourses.course");
    return result;
});
const updateCourseFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { preRequisiteCourses } = payload, remainingCourseData = __rest(payload, ["preRequisiteCourses"]);
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //basic info updated
        const updateBasicCourseInfo = yield schemaModel_1.CourseModel.findByIdAndUpdate(id, remainingCourseData, {
            new: true,
            session,
        });
        if (!updateBasicCourseInfo) {
            throw new AppError_1.default(400, "fain to update basic course info");
        }
        //check if any non primitive data updated
        if (preRequisiteCourses && preRequisiteCourses.length > 0) {
            //filter out the deleted data
            const deletedPreRequisites = preRequisiteCourses
                .filter((elem) => elem.course && elem.isDeleted)
                .map((el) => el.course);
            const deletedPreRequisitesCourses = yield schemaModel_1.CourseModel.findByIdAndUpdate(id, {
                $pull: {
                    preRequisiteCourses: { course: { $in: deletedPreRequisites } },
                },
            }, { new: true, session });
            if (!deletedPreRequisitesCourses) {
                throw new AppError_1.default(400, "fail to delete preRequisite course");
            }
            //filter out the deleted data
            const newPreRequisites = preRequisiteCourses === null || preRequisiteCourses === void 0 ? void 0 : preRequisiteCourses.filter((el) => el.course && !el.isDeleted);
            const newPreRequisiteCourses = yield schemaModel_1.CourseModel.findByIdAndUpdate(id, {
                $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
            }, { new: true, session });
            if (!newPreRequisiteCourses) {
                throw new AppError_1.default(400, "Fail to add PreRequisite courses");
            }
        }
        yield session.commitTransaction();
        yield session.endSession();
        const result = yield schemaModel_1.CourseModel.findById(id).populate("preRequisiteCourses.course");
        return result;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(error.message);
    }
});
const deleteCourseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield schemaModel_1.CourseModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
});
const assignFacultiesInCourseIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield schemaModel_1.CourseFacultyModel.findByIdAndUpdate(id, {
        course: id,
        $addToSet: { faculties: { $each: payload } },
    }, { upsert: true, new: true });
    return result;
});
const removeFacultiesFromCourseFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield schemaModel_1.CourseFacultyModel.findByIdAndUpdate(id, {
        $pull: { faculties: { $in: payload } },
    }, { new: true });
    return result;
});
exports.CourseServices = {
    createCourseIntoDB,
    getAllCoursesFromDB,
    getSingleCourseFromDB,
    updateCourseFromDB,
    deleteCourseFromDB,
    assignFacultiesInCourseIntoDB,
    removeFacultiesFromCourseFromDB,
};
