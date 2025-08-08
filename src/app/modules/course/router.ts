import { Router } from "express";
import { CourseController } from "./controller";
import authValidation from "../../middleware/authValidation";
import { USER_ROLE } from "../user/constant";

const router = Router();

router.post(
  "/create-course",
  // authValidation(USER_ROLE.admin),
  CourseController.createCourse
);
router.get("/", CourseController.getAllCourses);
router.get("/:id", CourseController.getSingleCourse);
router.patch(
  "/:id",
  // authValidation(USER_ROLE.admin),
  CourseController.updateCourse
);
router.delete(
  "/:id",
  // authValidation(USER_ROLE.admin),
  CourseController.deleteCourse
);
router.put(
  "/:courseId/assign-faculties",
  CourseController.assignFacultiesInCourse
);
router.delete(
  "/:courseId/remove-faculties",
  CourseController.removeFacultiesFromCourse
);

export const CourseRouter = router;
