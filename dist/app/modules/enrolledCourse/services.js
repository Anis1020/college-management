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
exports.EnrolledCourseServices = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const schemaModel_1 = require("../offeredCourse/schemaModel");
const schemaModel_2 = require("../student/schemaModel");
const schemaModel_3 = require("./schemaModel");
const schemaModel_4 = require("../semesterRegistration/schemaModel");
const createEnrolledCourseIntoDB = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    /*
  1. if the offer course exist
  2.if this student already enroller //for check need userId,
   offeredCourse id,semesterRegistration id
  
  3.create an enroller course
  */
    const { offeredCourse } = payload;
    const isOfferedCourseExist = yield schemaModel_1.OfferedCourseModel.findById(offeredCourse);
    if (!isOfferedCourseExist) {
        throw new AppError_1.default(404, "this offer course is oot found");
    }
    if (isOfferedCourseExist.maxCapacity <= 0) {
        throw new AppError_1.default(404, "room is full");
    }
    const studentId = yield schemaModel_2.StudentModel.findOne({ id: userId }, { _id: 1 });
    if (!studentId) {
        throw new AppError_1.default(404, "student not found");
    }
    const isStudentAlreadyEnrolled = yield schemaModel_3.EnrolledCourseModel.findOne({
        semesterRegistration: isOfferedCourseExist === null || isOfferedCourseExist === void 0 ? void 0 : isOfferedCourseExist.semesterRegistration,
        offeredCourse,
        student: studentId === null || studentId === void 0 ? void 0 : studentId._id,
    });
    if (isStudentAlreadyEnrolled) {
        throw new AppError_1.default(404, "student is already enrolled");
    }
    //check total credit to exit maxCredit
    const semesterRegistration = yield schemaModel_4.SemesterRegistrationModel.findById(isOfferedCourseExist.semesterRegistration).select("maxCredit");
    //if total enrolled credits + new enrolled credit>maxCredit
    const enrolledCourses = yield schemaModel_3.EnrolledCourseModel.aggregate([
        {
            $match: {
                semesterRegistration: isOfferedCourseExist.semesterRegistration,
                student: studentId._id,
            },
        },
        {
            $lookup: {
                from: "courses",
                localField: "course",
                foreignField: "_id",
                as: "enrolledCourse",
            },
        },
        {
            $unwind: "$enrolledCourse",
        },
        {
            $group: {
                _id: null,
                totalEnrolledCourse: { $sum: "$enrolledCourse.credits" },
            },
        },
        {
            $project: {
                _id: null,
                totalEnrolledCourse: 1,
            },
        },
    ]);
    console.log(enrolledCourses);
    //   const session = await mongoose.startSession();
    //   try {
    //     session.startTransaction();
    //     const result = await EnrolledCourseModel.create(
    //       [
    //         {
    //           semesterRegistration: isOfferedCourseExist.semesterRegistration,
    //           academicSemester: isOfferedCourseExist.academicSemester,
    //           academicFaculty: isOfferedCourseExist.academicFaculty,
    //           academicDepartment: isOfferedCourseExist.academicDepartment,
    //           course: isOfferedCourseExist.course,
    //           offeredCourse: offeredCourse,
    //           faculty: isOfferedCourseExist.faculty,
    //           student: studentId._id,
    //           isEnrolled: true,
    //         },
    //       ],
    //       { session }
    //     );
    //     if (!result) {
    //       throw new AppError(400, "fail to enrolled this course");
    //     }
    //     const maxCapacity = isOfferedCourseExist.maxCapacity;
    //     await OfferedCourseModel.findByIdAndUpdate(offeredCourse, {
    //       maxCapacity: maxCapacity - 1,
    //     });
    //     await session.commitTransaction();
    //     await session.endSession();
    //     return result;
    //   } catch (error) {
    //     await session.abortTransaction();
    //     await session.endSession();
    //     throw new AppError(400, "fail to enrolled course");
    //   }
});
const getAllEnrolledCourseIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield schemaModel_3.EnrolledCourseModel.find(payload);
    return result;
});
const getSingleEnrolledCourseIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield schemaModel_3.EnrolledCourseModel.findById(id);
    return result;
});
exports.EnrolledCourseServices = {
    createEnrolledCourseIntoDB,
    getAllEnrolledCourseIntoDB,
    getSingleEnrolledCourseIntoDB,
};
