import { Router } from "express";
import { FacultyController } from "./controller";

const router = Router();

router.get("/", FacultyController.getAllFaculty);
router.get("/:id", FacultyController.getSingleFaculty);
router.patch("/:id", FacultyController.updateFaculty);
router.delete("/:id", FacultyController.deleteFaculty);
export const FacultyRouter = router;
