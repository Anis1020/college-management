import mongoose from "mongoose";
import { TStudent } from "./interface";
import { StudentModel } from "./schemaModel";
import { UserModel } from "../user/schemaModel";

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findById(id);
  return result;
};

const updateStudentFromDB = async (id: string, payload: Partial<TStudent>) => {
  const result = await StudentModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const deletedUser = await UserModel.deleteOne({ id });
  const deleteStudent = await StudentModel.deleteOne({ id });
  return {
    deletedUser,
    deleteStudent,
    message: "Student and associated user deleted successfully",
    success: true,
  };
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentFromDB,
  deleteStudentFromDB,
};
