import mongoose from "mongoose";
import { TStudent } from "../student/interface";
import { StudentModel } from "../student/schemaModel";
import { TUser } from "./interface";
import { UserModel } from "./schemaModel";
import { SemesterModel } from "../semester/schemaModel";
import { generatedId } from "./utils";

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  if (await StudentModel.isUserExists(payload.id)) {
    throw new Error("user already exist ");
  }

  const userData: Partial<TUser> = {};
  userData.password = password;
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
    throw new Error("Failed to create user and student");
  }
};

export const UserServices = {
  createStudentIntoDB,
};
