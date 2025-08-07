"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyRouter = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const authValidation_1 = __importDefault(require("../../middleware/authValidation"));
const constant_1 = require("../user/constant");
const router = (0, express_1.Router)();
router.get("/", (0, authValidation_1.default)(constant_1.USER_ROLE.admin, constant_1.USER_ROLE.faculty), controller_1.FacultyController.getAllFaculty);
router.get("/:id", controller_1.FacultyController.getSingleFaculty);
router.patch("/:id", controller_1.FacultyController.updateFaculty);
router.delete("/:id", controller_1.FacultyController.deleteFaculty);
exports.FacultyRouter = router;
