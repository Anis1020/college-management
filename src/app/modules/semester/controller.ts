import { catchAsync } from "../../utils/catchAsync";
import { SemesterService } from "./services";

const createSemester = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await SemesterService.createSemesterIntoDB(payload);
  res.status(201).json({
    success: true,
    message: "Semester created successfully",
    data: result,
  });
});

const getAllSemester = catchAsync(async (req, res) => {
  const result = await SemesterService.getAllSemesterFromDB();
  res.status(200).json({
    success: true,
    message: "Semester get successfully",
    data: result,
  });
});

const getSingleSemester = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SemesterService.getSingleSemesterFromDB(id);
  res.status(200).json({
    success: true,
    message: "Single Semester get successfully",
    data: result,
  });
});
const updateSemester = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SemesterService.updateSemesterFromDB(id, req.body);
  res.status(200).json({
    success: true,
    message: "Update Semester  successfully",
    data: result,
  });
});

export const SemesterControllers = {
  createSemester,
  getAllSemester,
  getSingleSemester,
  updateSemester,
};
