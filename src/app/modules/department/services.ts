import { TDepartment } from "./interface";
import { DepartmentModel } from "./schemaModel";

const createDepartmentIntoDB = async (payload: TDepartment) => {
  const result = await DepartmentModel.create(payload);
  return result;
};
const getAllDepartmentFromDB = async () => {
  const result = await DepartmentModel.find().populate("academicFaculty");
  return result;
};
const getSingleDepartmentFromDB = async (id: string) => {
  const result = await DepartmentModel.findById(id).populate("academicFaculty");
  return result;
};
const updateDepartment = async (id: string, payload: Partial<TDepartment>) => {
  const result = await DepartmentModel.findOneAndUpdate({ id }, payload);
  return result;
};

export const DepartmentServices = {
  createDepartmentIntoDB,
  getAllDepartmentFromDB,
  getSingleDepartmentFromDB,
  updateDepartment,
};
