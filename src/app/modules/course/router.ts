import { Router } from "express";
import { CourseController } from "./controller";

const router = Router();

router.post("/create-course", CourseController.createCourse);
router.get("/", CourseController.getAllCourses);
router.get("/:id", CourseController.getSingleCourse);
router.delete("/:id", CourseController.deleteCourse);

export const CourseRouter = router;
