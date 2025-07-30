"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentRouter = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const zodValidation_1 = require("./zodValidation");
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
router.post("/create-department", (0, validateRequest_1.default)(zodValidation_1.DepartmentValidations.createDepartmentValidation), controller_1.DepartmentController.createDepartment);
router.patch("/:id", (0, validateRequest_1.default)(zodValidation_1.DepartmentValidations.updateDepartmentValidation), controller_1.DepartmentController.updateDepartment);
router.get("/:id", controller_1.DepartmentController.getSingleDepartment);
router.get("/", controller_1.DepartmentController.getAllDepartment);
exports.DepartmentRouter = router;
