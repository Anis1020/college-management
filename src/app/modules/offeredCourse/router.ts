import { Router } from "express";
import { OfferedCourseController } from "./controller";

const router = Router();

router.post(
  "/create-offered-course",
  OfferedCourseController.createOfferedCourse
);
router.get("/", OfferedCourseController.getAllOfferedCourse);
router.get("/:id", OfferedCourseController.getSingleOfferedCourse);

export const OfferedCourseRouter = router;
