import { TSemester } from "../semester/interface";
import { UserModel } from "./schemaModel";

const findLastStudent = async () => {
  const lastStudentId = await UserModel.findOne(
    {
      role: "student",
    },
    {
      id: 1,
      _id: 0,
    }
  ).sort({
    createdAt: -1,
  });
  return lastStudentId?.id ? lastStudentId?.id : undefined;
};

export const generatedId = async (payload: TSemester) => {
  let currentId = (0).toString();

  const lastStudentId = await findLastStudent();
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const lastStudentSemesterYear = lastStudentId?.substring(0, 4);
  const currentSemesterCode = payload.code;
  const currentSemesterYear = payload.year;

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentSemesterYear === currentSemesterYear
  ) {
    currentId = lastStudentId.substring(6);
  }
  let incrementId = (parseInt(currentId) + 1).toString();
  return `${currentSemesterYear}${currentSemesterCode}${incrementId.padStart(
    4,
    "0"
  )}`;
};

//faculty id generate
const findLastFaculty = async () => {
  const lastFacultyId = await UserModel.findOne(
    {
      role: "faculty",
    },
    {
      id: 1,
      _id: 0,
    }
  ).sort({
    createdAt: -1,
  });
  return lastFacultyId?.id ? lastFacultyId.id : undefined;
};

export const generatedFacultyId = async () => {
  let currentId = (0).toString();

  const lastFacultyId = await findLastFaculty();
  if (lastFacultyId) {
    currentId = lastFacultyId.substring(2);
  }
  const incrementId = (Number(currentId) + 1).toString();
  return `F-${incrementId.padStart(4, "0")}`;
};
