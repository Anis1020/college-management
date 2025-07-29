import { Router } from "express";
import { SemesterControllers } from "./controller";

const router = Router();

router.post("/create-semester", SemesterControllers.createSemester);

export const SemesterRouter = router;
