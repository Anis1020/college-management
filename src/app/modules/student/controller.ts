import { catchAsync } from "../../utils/catchAsync";
import { StudentServices } from "./services";

const getAllStudent = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB(req.query);
  res.status(200).json({
    success: true,
    message: "Students retrieved successfully",
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(id);
  res.status(200).json({
    success: true,
    message: "Student retrieved successfully",
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { student } = req.body;
  const result = await StudentServices.updateStudentFromDB(id, student);
  res.status(200).json({
    success: true,
    message: "Student updated successfully",
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.deleteStudentFromDB(id);
  res.status(200).json({
    success: true,
    message: "Student deleted successfully",
    data: result,
  });
});

export const StudentController = {
  getAllStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
