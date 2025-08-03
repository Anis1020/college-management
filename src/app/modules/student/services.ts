import mongoose from "mongoose";
import { TStudent } from "./interface";
import { StudentModel } from "./schemaModel";
import { UserModel } from "../user/schemaModel";
import AppError from "../../errors/AppError";
import QueryBuilder from "../../builder/QueryBuilder";
import { studentSearchableField } from "./constant";

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
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

  const studentQuery = new QueryBuilder(StudentModel.find(), query)
    .search(studentSearchableField)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  // const result = await StudentModel.aggregate([{ $match: { id } }]);
  const result = await StudentModel.findById(id)
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

const updateStudentFromDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

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
  const result = await StudentModel.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
  });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const deleteStudent = await StudentModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session }
    );
    if (!deleteStudent) {
      throw new AppError(404, "Fail to delete student");
    }
    const userId = deleteStudent.user;

    const deletedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedUser) {
      throw new AppError(404, "Fain to delete user");
    }

    await session.commitTransaction();
    session.endSession;
    return {
      message: "Student and associated user deleted successfully",
      success: true,
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession;
    throw new AppError(404, "fail to delete user or student");
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentFromDB,
  deleteStudentFromDB,
};
