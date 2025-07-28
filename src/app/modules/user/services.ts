import { TStudent } from "../student/interface";
import { StudentModel } from "../student/schemaModel";

const createStudentIntoDB = async (payload: TStudent) => {
  const result = await StudentModel.create(payload);
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
};
