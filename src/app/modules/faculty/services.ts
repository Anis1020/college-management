import { TFaculty } from "./interface";
import { FacultyModel } from "./schemaModel";

const getAllFacultyFromDB = async () => {
  const result = await FacultyModel.find()
    .populate("academicFaculty")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};
const getSingleFacultyFromDB = async (id: string) => {
  const result = await FacultyModel.findById(id)
    .populate("academicFaculty")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};
const updateFacultyIntoDB = async (id: string, payload: Partial<TFaculty>) => {
  const { name, guardian, localGuardian, ...restOfData } = payload;
  const modifiedFacultyData: Record<string, unknown> = { ...restOfData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedFacultyData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedFacultyData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedFacultyData[`localGuardian.${key}`] = value;
    }
  }

  const result = await FacultyModel.findByIdAndUpdate(id, payload);
  return result;
};

const deleteFacultyIntoDB = async (id: string) => {
  const result = await FacultyModel.findByIdAndUpdate(id);
  return result;
};
export const FacultyServices = {
  getAllFacultyFromDB,
  getSingleFacultyFromDB,
  updateFacultyIntoDB,
  deleteFacultyIntoDB,
};
