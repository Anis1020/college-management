import { catchAsync } from "../../utils/catchAsync";
import { CourseServices } from "./services";

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);
  res.status(200).json({
    success: true,
    message: "course created successfully",
    data: result,
  });
});
const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCoursesFromDB(req.query);
  res.status(200).json({
    success: true,
    message: "get all course successfully",
    data: result,
  });
});
const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.getSingleCourseFromDB(id);
  res.status(200).json({
    success: true,
    message: "get single course successfully",
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.updateCourseFromDB(id, req.body);
  res.status(200).json({
    success: true,
    message: " course update successfully",
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.deleteCourseFromDB(id);
  res.status(200).json({
    success: true,
    message: "delete single course successfully",
    data: result,
  });
});

const assignFacultiesInCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await CourseServices.assignFacultiesInCourseIntoDB(
    courseId,
    faculties
  );
  res.status(200).json({
    success: true,
    message: " course faculties assign successfully",
    data: result,
  });
});

const removeFacultiesFromCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await CourseServices.removeFacultiesFromCourseFromDB(
    courseId,
    faculties
  );
  res.status(200).json({
    success: true,
    message: " course faculties remove successfully",
    data: result,
  });
});

export const CourseController = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  assignFacultiesInCourse,
  removeFacultiesFromCourse,
};
