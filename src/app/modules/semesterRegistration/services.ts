import AppError from "../../errors/AppError";
import { SemesterModel } from "../semester/schemaModel";
import { TSemesterRegistration } from "./interface";
import { SemesterRegistrationModel } from "./schemaModel";

const createSemesterRegistrationIntoD = async (
  payload: TSemesterRegistration
) => {
  const academicSemester = payload?.academicSemester;

  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistrationModel.findOne({
      $or: [{ status: "UPCOMING" }, { status: "ONGOING" }],
    });

  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      400,
      `There is already a ${isThereAnyUpcomingOrOngoingSemester.status} course ready `
    );
  }

  //check this semester exist or not
  const isAcademicSemesterExists = await SemesterModel.findById(
    academicSemester
  );
  if (!isAcademicSemesterExists) {
    throw new AppError(400, "Semester dost not found");
  }

  //check this semester already exist or not
  const isSemesterRegistrationExists = await SemesterRegistrationModel.findOne({
    academicSemester,
  });
  if (isSemesterRegistrationExists) {
    throw new AppError(404, "this semester registration already exist");
  }

  const result = await SemesterRegistrationModel.create(payload);
  return result;
};
const getAllSemesterRegistrationIntoD = async (
  payload: Record<string, unknown>
) => {
  const result = await SemesterRegistrationModel.find();
  return result;
};
const getSingleSemesterRegistrationIntoD = async (id: string) => {
  const result = await SemesterRegistrationModel.findById(id);
  return result;
};
const updateSemesterRegistrationIntoD = async (
  id: string,
  payload: Partial<TSemesterRegistration>
) => {
  const isSemesterRegistrationExists =
    await SemesterRegistrationModel.findByIdAndUpdate(id);
  if (!isSemesterRegistrationExists) {
    throw new AppError(400, "");
  }
  const currentSemesterStatus = isSemesterRegistrationExists?.status;
  if (currentSemesterStatus === "ENDED") {
    throw new AppError(404, `semester already ended`);
  }

  return isSemesterRegistrationExists;
};
export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoD,
  getAllSemesterRegistrationIntoD,
  getSingleSemesterRegistrationIntoD,
  updateSemesterRegistrationIntoD,
};
