import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import { OfferedCourseModel } from "../offeredCourse/schemaModel";
import { StudentModel } from "../student/schemaModel";
import { TEnrolledCourse } from "./interface";
import { EnrolledCourseModel } from "./schemaModel";
import { SemesterRegistrationModel } from "../semesterRegistration/schemaModel";

const createEnrolledCourseIntoDB = async (
  userId: string,
  payload: TEnrolledCourse
) => {
  /*
1. if the offer course exist
2.if this student already enroller //for check need userId,
 offeredCourse id,semesterRegistration id

3.create an enroller course
*/
  const { offeredCourse } = payload;

  const isOfferedCourseExist = await OfferedCourseModel.findById(offeredCourse);

  if (!isOfferedCourseExist) {
    throw new AppError(404, "this offer course is oot found");
  }

  if (isOfferedCourseExist.maxCapacity <= 0) {
    throw new AppError(404, "room is full");
  }

  const studentId = await StudentModel.findOne({ id: userId }, { _id: 1 });

  if (!studentId) {
    throw new AppError(404, "student not found");
  }
  const isStudentAlreadyEnrolled = await EnrolledCourseModel.findOne({
    semesterRegistration: isOfferedCourseExist?.semesterRegistration,
    offeredCourse,
    student: studentId?._id,
  });
  if (isStudentAlreadyEnrolled) {
    throw new AppError(404, "student is already enrolled");
  }

  //check total credit to exit maxCredit
  const semesterRegistration = await SemesterRegistrationModel.findById(
    isOfferedCourseExist.semesterRegistration
  ).select("maxCredit");

  //if total enrolled credits + new enrolled credit>maxCredit
  const enrolledCourses = await EnrolledCourseModel.aggregate([
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
};
const getAllEnrolledCourseIntoDB = async (payload: TEnrolledCourse) => {
  const result = await EnrolledCourseModel.find(payload);
  return result;
};
const getSingleEnrolledCourseIntoDB = async (id: string) => {
  const result = await EnrolledCourseModel.findById(id);
  return result;
};

export const EnrolledCourseServices = {
  createEnrolledCourseIntoDB,
  getAllEnrolledCourseIntoDB,
  getSingleEnrolledCourseIntoDB,
};
