import id from "zod/v4/locales/id.cjs";
import { catchAsync } from "../../utils/catchAsync";
import { FacultyServices } from "./services";

const getAllFaculty = catchAsync(async (req, res) => {
  const result = await FacultyServices.getAllFacultyFromDB();
  res.status(200).json({
    success: true,
    message: "get all faculty",
    data: result,
  });
});
const getSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacultyServices.getSingleFacultyFromDB(id);
  res.status(200).json({
    success: true,
    message: "get single faculty",
    data: result,
  });
});
const updateFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacultyServices.updateFacultyIntoDB(id, req.body);
  res.status(200).json({
    success: true,
    message: "faculty update successfully",
    data: result,
  });
});
const deleteFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacultyServices.deleteFacultyIntoDB(id);
  res.status(200).json({
    success: true,
    message: "faculty deleted successfully",
    data: result,
  });
});
export const FacultyController = {
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
