import { Router } from "express";
import { SemesterControllers } from "./controller";
import validateRequest from "../../middleware/validateRequest";
import { SemesterValidations } from "./zodValidation";

const router = Router();

router.post(
  "/create-semester",
  validateRequest(SemesterValidations.createSemesterValidation),
  SemesterControllers.createSemester
);
router.patch(
  "/:id",
  validateRequest(SemesterValidations.updateSemesterValidation),
  SemesterControllers.updateSemester
);
router.get("/:id", SemesterControllers.getSingleSemester);
router.get("/", SemesterControllers.getAllSemester);

export const SemesterRouter = router;
