import { Router } from "express";
import { UserController } from "./controller";
import validateRequest from "../../middleware/validateRequest";
import { StudentValidations } from "../student/zodValidation";
import authValidation from "../../middleware/authValidation";
import { USER_ROLE } from "./constant";

const router = Router();

router.post(
  "/create-student",
  // authValidation(USER_ROLE.admin),
  validateRequest(StudentValidations.createStudentValidation),
  UserController.createStudent
);
router.post(
  "/create-faculty",
  // authValidation(USER_ROLE.admin),
  UserController.createFaculty
);
router.post(
  "/create-admin",
  // authValidation(USER_ROLE.admin),
  UserController.createAdmin
);
router.get(
  "/me",
  // authValidation(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  UserController.getMe
);
router.patch(
  "/change-status/:id",
  authValidation(USER_ROLE.admin),
  UserController.changeStatus
);
export const UserRouter = router;
