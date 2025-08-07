"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const zodValidation_1 = require("../student/zodValidation");
const authValidation_1 = __importDefault(require("../../middleware/authValidation"));
const constant_1 = require("./constant");
const router = (0, express_1.Router)();
router.post("/create-student", (0, authValidation_1.default)(constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(zodValidation_1.StudentValidations.createStudentValidation), controller_1.UserController.createStudent);
router.post("/create-faculty", (0, authValidation_1.default)(constant_1.USER_ROLE.admin), controller_1.UserController.createFaculty);
router.post("/create-admin", 
// authValidation(USER_ROLE.admin),
controller_1.UserController.createAdmin);
exports.UserRouter = router;
