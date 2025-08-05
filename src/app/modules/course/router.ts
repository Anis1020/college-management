import { Router } from "express";
import { CourseController } from "./controller";

const router = Router();

router.post("/create-course", CourseController.createCourse);
router.get("/", CourseController.getAllCourses);
router.get("/:id", CourseController.getSingleCourse);
router.patch("/:id", CourseController.updateCourse);
router.delete("/:id", CourseController.deleteCourse);
router.put(
  "/:courseId/assign-faculties",
  CourseController.assignFacultiesInCourse
);
router.delete(
  "/:courseId/remove-faculties",
  CourseController.removeFacultiesFromCourse
);
export const CourseRouter = router;
