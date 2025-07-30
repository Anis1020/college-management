import { catchAsync } from "../../utils/catchAsync";
import { DepartmentServices } from "./services";

const createDepartment = catchAsync(async (req, res) => {
  const result = await DepartmentServices.createDepartmentIntoDB(req.body);
  res.status(200).json({
    success: true,
    message: "Department created successfully",
    data: result,
  });
});

const getAllDepartment = catchAsync(async (req, res) => {
  const result = await DepartmentServices.getAllDepartmentFromDB();
  res.status(200).json({
    success: true,
    message: "All Department get successfully",
    data: result,
  });
});

const getSingleDepartment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await DepartmentServices.getSingleDepartmentFromDB(id);
  res.status(200).json({
    success: true,
    message: "get single Department successfully",
    data: result,
  });
});

const updateDepartment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await DepartmentServices.updateDepartment(id, req.body);
  res.status(200).json({
    success: true,
    message: "update Department successfully",
    data: result,
  });
});

export const DepartmentController = {
  createDepartment,
  getAllDepartment,
  getSingleDepartment,
  updateDepartment,
};
