import { catchAsync } from "../../utils/catchAsync";
import { OfferedCourseServices } from "./services";

const createOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.createOfferedCourseIntoDB(
    req.body
  );
  res.status(200).json({
    success: true,
    message: "create offered course successfully",
    data: result,
  });
});
const getAllOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.getAllOfferedCourseIntoDB();
  res.status(200).json({
    success: true,
    message: "create offered course successfully",
    data: result,
  });
});
const getSingleOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.getAllOfferedCourseIntoDB();
  res.status(200).json({
    success: true,
    message: "create offered course successfully",
    data: result,
  });
});

export const OfferedCourseController = {
  createOfferedCourse,
  getAllOfferedCourse,
  getSingleOfferedCourse,
};
