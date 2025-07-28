import { Request, Response } from "express";
import { StudentServices } from "./services";
import { catchAsync } from "../../utils/catchAsync";

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const studentData = req.body;
  const result = await StudentServices.createStudentIntoDB(studentData);
  res.status(201).json({
    success: true,
    message: "Student created successfully",
    data: result,
  });
});

export const UserController = {
  createStudent,
};
