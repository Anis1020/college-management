import { catchAsync } from "../../utils/catchAsync";
import { EnrolledCourseServices } from "./services";

const createEnrolledCourse = catchAsync(async (req, res) => {
  const user = req.user.userId;
  const result = await EnrolledCourseServices.createEnrolledCourseIntoDB(
    user,
    req.body
  );
  res.status(200).json({
    success: true,
    message: "enrolled Course created successfully",
    data: result,
  });
});
const getAllEnrolledCourse = catchAsync(async (req, res) => {
  const result = await EnrolledCourseServices.getAllEnrolledCourseIntoDB(
    req.body
  );
  res.status(200).json({
    success: true,
    message: "all enrolled Course get successfully",
    data: result,
  });
});
const getSingleEnrolledCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await EnrolledCourseServices.getSingleEnrolledCourseIntoDB(id);
  res.status(200).json({
    success: true,
    message: "enrolled Course created successfully",
    data: result,
  });
});

export const EnrolledCourseController = {
  createEnrolledCourse,
  getAllEnrolledCourse,
  getSingleEnrolledCourse,
};
