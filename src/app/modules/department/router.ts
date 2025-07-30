import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { DepartmentValidations } from "./zodValidation";
import { DepartmentController } from "./controller";

const router = Router();
router.post(
  "/create-department",
  validateRequest(DepartmentValidations.createDepartmentValidation),
  DepartmentController.createDepartment
);
router.patch(
  "/:id",
  validateRequest(DepartmentValidations.updateDepartmentValidation),
  DepartmentController.updateDepartment
);
router.get("/:id", DepartmentController.getSingleDepartment);
router.get("/", DepartmentController.getAllDepartment);

export const DepartmentRouter = router;
