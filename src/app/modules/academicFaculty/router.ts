import { Router } from "express";
import { AcademicFacultyController } from "./controller";
import validateRequest from "../../middleware/validateRequest";
import { AcademicFacultyValidations } from "./zodValidation";

const router = Router();
router.post(
  "/create-academic-faculty",
  validateRequest(AcademicFacultyValidations.createAcademicFacultyValidation),
  AcademicFacultyController.createAcademicFaculty
);
router.patch(
  "/:id",
  validateRequest(AcademicFacultyValidations.updateAcademicFacultyValidation),
  AcademicFacultyController.updateAcademicFaculty
);
router.get("/:id", AcademicFacultyController.getSingleAcademicFaculty);
router.get("/", AcademicFacultyController.getAllAcademicFaculty);

export const AcademicFacultyRouter = router;
