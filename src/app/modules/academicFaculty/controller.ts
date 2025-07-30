import id from "zod/v4/locales/id.cjs";
import { catchAsync } from "../../utils/catchAsync";
import { AcademicFacultyServices } from "./services";

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
    req.body
  );
  res.status(200).json({
    success: true,
    message: "Academic faculty created successfully",
    data: result,
  });
});
const getAllAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultyIntoDB();
  res.status(200).json({
    success: true,
    message: "Get all Academic faculty successfully",
    data: result,
  });
});
const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AcademicFacultyServices.getSingleAcademicFaculty(id);
  res.status(200).json({
    success: true,
    message: "Get single Academic faculty successfully",
    data: result,
  });
});
const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AcademicFacultyServices.updateAcademicFaculty(
    id,
    req.body
  );
  res.status(200).json({
    success: true,
    message: "Update Academic faculty successfully",
    data: result,
  });
});
export const AcademicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
