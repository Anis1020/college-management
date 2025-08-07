import { Router } from "express";
import { FacultyController } from "./controller";
import authValidation from "../../middleware/authValidation";
import { USER_ROLE } from "../user/constant";

const router = Router();

router.get(
  "/",
  authValidation(USER_ROLE.admin, USER_ROLE.faculty),
  FacultyController.getAllFaculty
);
router.get("/:id", FacultyController.getSingleFaculty);
router.patch("/:id", FacultyController.updateFaculty);
router.delete("/:id", FacultyController.deleteFaculty);
export const FacultyRouter = router;
