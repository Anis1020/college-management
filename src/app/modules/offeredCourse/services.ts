import AppError from "../../errors/AppError";
import { AcademicFacultyModel } from "../academicFaculty/schemaModel";
import { CourseModel } from "../course/schemaModel";
import { DepartmentModel } from "../department/schemaModel";
import { FacultyModel } from "../faculty/schemaModel";
import { SemesterRegistrationModel } from "../semesterRegistration/schemaModel";
import { TOfferedCourse } from "./interface";
import { OfferedCourseModel } from "./schemaModel";
import { timeConflict } from "./utils";

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    faculty,
    course,
    section,
    days,
    startTime,
    endTime,
  } = payload;

  //check all are valid or not
  const isSemesterRegistrationExist = await SemesterRegistrationModel.findById(
    semesterRegistration
  );
  if (!isSemesterRegistrationExist) {
    throw new AppError(404, "semester registration not found");
  }

  const academicSemester = isSemesterRegistrationExist.academicSemester;

  const isAcademicFacultyExist = await AcademicFacultyModel.findById(
    academicFaculty
  );
  if (!isAcademicFacultyExist) {
    throw new AppError(400, "academic faculty not found");
  }
  const isAcademicDepartmentExist = await DepartmentModel.findById(
    academicDepartment
  );
  if (!isAcademicDepartmentExist) {
    throw new AppError(400, "academic department not fount");
  }
  const isCourseExist = await CourseModel.findById(course);
  if (!isCourseExist) {
    throw new AppError(400, "course not found");
  }
  const isFacultyExist = await FacultyModel.findById(faculty);
  if (!isFacultyExist) {
    throw new AppError(400, "faculty not found");
  }

  const isTheDepartmentBelongToFaculty = await DepartmentModel.findOne({
    _id: academicDepartment,
    academicFaculty,
  });
  if (!isTheDepartmentBelongToFaculty) {
    throw new AppError(
      400,
      `this department of ${isAcademicDepartmentExist.name} is not belong to this ${isAcademicFacultyExist.name}`
    );
  }

  const isSameOfferedCourse_SemesterRegistration_Section_Exist =
    await OfferedCourseModel.findOne({
      semesterRegistration,
      course,
      section,
    });
  if (isSameOfferedCourse_SemesterRegistration_Section_Exist) {
    throw new AppError(400, `Offered course with same section already exist`);
  }

  const assignedSchedules = await OfferedCourseModel.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select("days startTime endTime");

  const newSchedules = {
    days,
    startTime,
    endTime,
  };

  if (timeConflict(assignedSchedules, newSchedules)) {
    throw new AppError(
      400,
      `this faculty is not available at this time choose other time or day`
    );
  }

  // const result = await OfferedCourseModel.create({
  //   ...payload,
  //   academicSemester,
  // });
  return null;
};

const getAllOfferedCourseIntoDB = async () => {
  const result = await OfferedCourseModel.find();
  return result;
};
const getSingleOfferedCourseIntoDB = async (id: string) => {
  const result = await OfferedCourseModel.findById(id);
  return result;
};

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Pick<TOfferedCourse, "faculty" | "days" | "startTime" | "endTime">
) => {
  const { faculty, days, startTime, endTime } = payload;
  const isOfferedCourseExist = await OfferedCourseModel.findById(id);
  if (!isOfferedCourseExist) {
    throw new AppError(400, "this offered course not found");
  }
  const isFacultyExist = await FacultyModel.findById(faculty);
  if (!isFacultyExist) {
    throw new AppError(400, "faculty not found");
  }

  const semesterRegistration = isOfferedCourseExist.semesterRegistration;
  const semesterRegistrationStatus = await SemesterRegistrationModel.findById(
    semesterRegistration
  );
  if (semesterRegistrationStatus?.status !== "UPCOMING") {
    throw new AppError(400, "now you can not update this offered course");
  }
  const assignedSchedules = await OfferedCourseModel.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select("days startTime endTime");

  const newSchedules = {
    days,
    startTime,
    endTime,
  };

  if (timeConflict(assignedSchedules, newSchedules)) {
    throw new AppError(
      400,
      `this faculty is not available at this time choose other time or day`
    );
  }

  const result = await OfferedCourseModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCourseIntoDB,
  getSingleOfferedCourseIntoDB,
  updateOfferedCourseIntoDB,
};
