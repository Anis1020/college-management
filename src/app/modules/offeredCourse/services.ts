import AppError from "../../errors/AppError";
import { AcademicFacultyModel } from "../academicFaculty/schemaModel";
import { CourseModel } from "../course/schemaModel";
import { DepartmentModel } from "../department/schemaModel";
import { FacultyModel } from "../faculty/schemaModel";
import { SemesterRegistrationModel } from "../semesterRegistration/schemaModel";
import { TOfferedCourse } from "./interface";
import { OfferedCourseModel } from "./schemaModel";

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    faculty,
    course,
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

  const result = await OfferedCourseModel.create({
    ...payload,
    academicSemester,
  });
  return result;
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
  payload: Partial<TOfferedCourse>
) => {
  const result = await OfferedCourseModel.findByIdAndUpdate(id, payload);
  return result;
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCourseIntoDB,
  getSingleOfferedCourseIntoDB,
  updateOfferedCourseIntoDB,
};
