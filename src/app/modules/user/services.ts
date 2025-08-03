import mongoose from "mongoose";
import { TStudent } from "../student/interface";
import { StudentModel } from "../student/schemaModel";
import { TUser } from "./interface";
import { UserModel } from "./schemaModel";
import { SemesterModel } from "../semester/schemaModel";
import { generatedFacultyId, generatedId } from "./utils";
import { config } from "../../config";
import AppError from "../../errors/AppError";
import { TFaculty } from "../faculty/interface";
import { FacultyModel } from "../faculty/schemaModel";

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //if data already exist then stop to create
  const isUserExists = await StudentModel.findOne({ email: payload.email });
  if (isUserExists) {
    throw new Error("this user already exist in db");
  }

  const userData: Partial<TUser> = {};
  userData.password = password || config.default_pass;
  userData.role = "student";

  const admissionSemester = await SemesterModel.findById(
    payload.admissionSemester
  );
  if (!admissionSemester) {
    throw new Error("Admission semester not found");
  }
  userData.id = await generatedId(admissionSemester);

  //checking is user already exist or not using mongoose statics methods

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const newUser = await UserModel.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(404, "fail to create user");
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    // payload.email = newUser.email;
    const result = await StudentModel.create([payload], { session });
    if (!result.length) {
      throw new AppError(404, "fail to create student");
    }
    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error("Failed to create user and student");
  }
};

//create faculty
const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  const UserData: Partial<TUser> = {};
  UserData.role = "faculty";
  UserData.password = password || config.default_pass;
  UserData.id = await generatedFacultyId();

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const newUser = await UserModel.create([UserData], { session });
    if (!newUser.length) {
      throw new Error("fail to create user");
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    const result = await FacultyModel.create([payload], { session });
    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error.message);
  }
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
};
