import { TDepartment } from "./interface";
import { DepartmentModel } from "./schemaModel";

const createDepartmentIntoDB = async (payload: TDepartment) => {
  const result = await DepartmentModel.create(payload);
  return result;
};
const getAllDepartmentFromDB = async () => {
  const result = await DepartmentModel.find();
  return result;
};
const getSingleDepartmentFromDB = async (id: string) => {
  const result = await DepartmentModel.findById(id);
  return result;
};
const updateDepartment = async (id: string, payload: Partial<TDepartment>) => {
  const result = await DepartmentModel.findByIdAndUpdate(id, payload);
  return result;
};

export const DepartmentServices = {
  createDepartmentIntoDB,
  getAllDepartmentFromDB,
  getSingleDepartmentFromDB,
  updateDepartment,
};
