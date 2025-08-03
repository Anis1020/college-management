import { Router } from "express";
import { FacultyController } from "./controller";

const router = Router();

router.get("/", FacultyController.getAllFaculty);
router.get("/:id", FacultyController.getSingleFaculty);
router.get("/:id", FacultyController.updateFaculty);
router.get("/:id", FacultyController.deleteFaculty);
export const FacultyRouter = router;
