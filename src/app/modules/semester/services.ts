import { TSemester } from "./interface";
import { SemesterModel } from "./schemaModel";

const createSemesterIntoDB = async (payload: TSemester) => {
  const result = await SemesterModel.create(payload);
  return result;
};

export const SemesterService = {
  createSemesterIntoDB,
};
