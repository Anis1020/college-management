import { TSemesterRegistration } from "./interface";
import { SemesterRegistration } from "./schemaModel";

const createSemesterRegistrationIntoD = async (
  payload: TSemesterRegistration
) => {
  const result = await SemesterRegistration.create(payload);
  return result;
};
const getAllSemesterRegistrationIntoD = async () => {
  const result = await SemesterRegistration.find();
  return result;
};
const getSingleSemesterRegistrationIntoD = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};
const updateSemesterRegistrationIntoD = async (id: string) => {
  const result = await SemesterRegistration.findByIdAndUpdate(id);
  return result;
};
export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoD,
  getAllSemesterRegistrationIntoD,
  getSingleSemesterRegistrationIntoD,
  updateSemesterRegistrationIntoD,
};
