import { TAdmin } from "./interface";
import { AdminModel } from "./schemaModel";

const getAllAdminsFromDB = async () => {
  const result = await AdminModel.find();
  return result;
};
const getSingleAdminFromDB = async (id: string) => {
  const result = await AdminModel.findById(id);
  return result;
};

const updateAdminIntoDB = async (id: string, payload: Partial<TAdmin>) => {
  const { name, guardian, localGuardian, ...remainingAdminData } = payload;
  const modifiedAdminData: Record<string, unknown> = { ...remainingAdminData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedAdminData[`name.${key}`] = value;
    }
  }

  const result = await AdminModel.findByIdAndUpdate(id, payload);
  return result;
};
const deleteAdminFromDB = async (id: string) => {
  const result = await AdminModel.findByIdAndUpdate(id);
  return result;
};
export const AdminServices = {
  getAllAdminsFromDB,
  getSingleAdminFromDB,
  updateAdminIntoDB,
  deleteAdminFromDB,
};
