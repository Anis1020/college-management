import { Router } from "express";
import { EnrolledCourseController } from "./controller";
import authValidation from "../../middleware/authValidation";
import { USER_ROLE } from "../user/constant";

const router = Router();

router.post(
  "/create-enrolled-course",
  //   authValidation(USER_ROLE.student),
  EnrolledCourseController.createEnrolledCourse
);
export const EnrolledCourseRoutes = router;
