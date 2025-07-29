import { Request, Response } from "express";
import { UserServices } from "./services";
import { catchAsync } from "../../utils/catchAsync";

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { password, student } = req.body;
  const result = await UserServices.createStudentIntoDB(password, student);
  res.status(200).json({
    success: true,
    message: "Student created successfully",
    data: result,
  });
});

export const UserController = {
  createStudent,
};
