import mongoose from "mongoose";
import { TStudent } from "../student/interface";
import { StudentModel } from "../student/schemaModel";
import { TUser } from "./interface";
import { UserModel } from "./schemaModel";

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};
  userData.password = password;
  userData.role = "student";
  userData.id = "studentId";

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const newUser = await UserModel.create([userData], { session });
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    // payload.email = newUser.email;
    const result = await StudentModel.create([payload], { session });
    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error("Failed to create student");
  }
};

export const StudentServices = {
  createStudentIntoDB,
};
