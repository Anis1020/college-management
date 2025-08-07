import { Request, Response } from "express";
import { UserServices } from "./services";
import { catchAsync } from "../../utils/catchAsync";
import AppError from "../../errors/AppError";
import { config } from "../../config";
import jwt from "jsonwebtoken";

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { password, student } = req.body;
  const result = await UserServices.createStudentIntoDB(password, student);
  res.status(200).json({
    success: true,
    message: "Student created successfully",
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password } = req.params;
  const result = await UserServices.createFacultyIntoDB(password, req.body);
  res.status(200).json({
    success: true,
    message: "Faculty created successfully",
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password } = req.params;
  const result = await UserServices.createAdminIntoDB(password, req.body);
  res.status(200).json({
    success: true,
    message: "admin created successfully",
    data: result,
  });
});
const getMe = catchAsync(async (req, res) => {
  const { userId, role } = req.user;
  const result = await UserServices.getMe(userId, role);
  res.status(200).json({
    success: true,
    message: "User is retrieved successfully",
    data: result,
  });
});

const changeStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.changeStatus(id);
  res.status(200).json({
    success: true,
    message: "User Status is update successfully",
    data: result,
  });
});

export const UserController = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  changeStatus,
};
