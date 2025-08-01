import { Router } from "express";
import { UserController } from "./controller";
import validateRequest from "../../middleware/validateRequest";
import { StudentValidations } from "../student/zodValidation";

const router = Router();

router.post(
  "/create-student",
  validateRequest(StudentValidations.createStudentValidation),
  UserController.createStudent
);
export const UserRouter = router;
