import mongoose from "mongoose";
import { TStudent } from "./interface";
import { StudentModel } from "./schemaModel";
import { UserModel } from "../user/schemaModel";

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find()
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
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
  const result = await StudentModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const deletedUser = await UserModel.updateOne({ id }, { isDeleted: true });
  const deleteStudent = await StudentModel.updateOne(
    { id },
    { isDeleted: true }
  );
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
