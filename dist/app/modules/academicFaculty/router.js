"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyRouter = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const zodValidation_1 = require("./zodValidation");
const router = (0, express_1.Router)();
router.post("/create-academic-faculty", (0, validateRequest_1.default)(zodValidation_1.AcademicFacultyValidations.createAcademicFacultyValidation), controller_1.AcademicFacultyController.createAcademicFaculty);
router.patch("/:id", (0, validateRequest_1.default)(zodValidation_1.AcademicFacultyValidations.updateAcademicFacultyValidation), controller_1.AcademicFacultyController.updateAcademicFaculty);
router.get("/:id", controller_1.AcademicFacultyController.getSingleAcademicFaculty);
router.get("/", controller_1.AcademicFacultyController.getAllAcademicFaculty);
exports.AcademicFacultyRouter = router;
