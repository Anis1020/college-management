"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemesterRouter = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const zodValidation_1 = require("./zodValidation");
const router = (0, express_1.Router)();
router.post("/create-semester", (0, validateRequest_1.default)(zodValidation_1.SemesterValidations.createSemesterValidation), controller_1.SemesterControllers.createSemester);
router.patch("/:id", (0, validateRequest_1.default)(zodValidation_1.SemesterValidations.updateSemesterValidation), controller_1.SemesterControllers.updateSemester);
router.get("/:id", controller_1.SemesterControllers.getSingleSemester);
router.get("/", controller_1.SemesterControllers.getAllSemester);
exports.SemesterRouter = router;
