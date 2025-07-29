import { semesterNameCodeMapper } from "./constant";
import { TSemester } from "./interface";
import { SemesterModel } from "./schemaModel";

const createSemesterIntoDB = async (payload: TSemester) => {
  //semester name =semester code

  if (semesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error("invalid semester name or code");
  }
  const result = await SemesterModel.create(payload);
  return result;
};

const getAllSemesterFromDB = async () => {
  const result = await SemesterModel.find();
  return result;
};

const getSingleSemesterFromDB = async (id: string) => {
  const result = await SemesterModel.findById(id);
  return result;
};

const updateSemesterFromDB = async (
  id: string,
  payload: Partial<TSemester>
) => {
  if (
    payload.name &&
    payload.code &&
    semesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error("invalid semester name or code");
  }
  const result = await SemesterModel.findByIdAndUpdate(id, payload);
  return result;
};

export const SemesterService = {
  createSemesterIntoDB,
  getAllSemesterFromDB,
  getSingleSemesterFromDB,
  updateSemesterFromDB,
};
