import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { TCourse, TCourseFaculty } from "./interface";
import { CourseFacultyModel, CourseModel } from "./schemaModel";
import AppError from "../../errors/AppError";

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await CourseModel.create(payload);
  return result;
};
const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
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
  const result = await CourseModel.find().populate(
    "preRequisiteCourses.course"
  );
  return result;
};
const getSingleCourseFromDB = async (id: string) => {
  const result = await CourseModel.findById(id).populate(
    "preRequisiteCourses.course"
  );
  return result;
};

const updateCourseFromDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...remainingCourseData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //basic info updated
    const updateBasicCourseInfo = await CourseModel.findByIdAndUpdate(
      id,
      remainingCourseData,
      {
        new: true,
        session,
      }
    );
    if (!updateBasicCourseInfo) {
      throw new AppError(400, "fain to update basic course info");
    }
    //check if any non primitive data updated
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      //filter out the deleted data
      const deletedPreRequisites = preRequisiteCourses
        .filter((elem) => elem.course && elem.isDeleted)
        .map((el) => el.course);

      const deletedPreRequisitesCourses = await CourseModel.findByIdAndUpdate(
        id,

        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPreRequisites } },
          },
        },
        { new: true, session }
      );
      if (!deletedPreRequisitesCourses) {
        throw new AppError(400, "fail to delete preRequisite course");
      }
      //filter out the deleted data
      const newPreRequisites = preRequisiteCourses?.filter(
        (el) => el.course && !el.isDeleted
      );
      const newPreRequisiteCourses = await CourseModel.findByIdAndUpdate(
        id,

        {
          $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
        },
        { new: true, session }
      );
      if (!newPreRequisiteCourses) {
        throw new AppError(400, "Fail to add PreRequisite courses");
      }
    }

    await session.commitTransaction();
    await session.endSession();

    const result = await CourseModel.findById(id).populate(
      "preRequisiteCourses.course"
    );

    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error.message);
  }
};

const deleteCourseFromDB = async (id: string) => {
  const result = await CourseModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};
const assignFacultiesInCourseIntoDB = async (
  id: string,
  payload: Partial<TCourseFaculty>
) => {
  const result = await CourseFacultyModel.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    { upsert: true, new: true }
  );
  return result;
};

const removeFacultiesFromCourseFromDB = async (
  id: string,
  payload: Partial<TCourseFaculty>
) => {
  const result = await CourseFacultyModel.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    { new: true }
  );
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  updateCourseFromDB,
  deleteCourseFromDB,
  assignFacultiesInCourseIntoDB,
  removeFacultiesFromCourseFromDB,
};
