"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRouter = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const authValidation_1 = __importDefault(require("../../middleware/authValidation"));
const constant_1 = require("../user/constant");
const router = (0, express_1.Router)();
router.post("/create-course", (0, authValidation_1.default)(constant_1.USER_ROLE.admin), controller_1.CourseController.createCourse);
router.get("/", controller_1.CourseController.getAllCourses);
router.get("/:id", controller_1.CourseController.getSingleCourse);
router.patch("/:id", (0, authValidation_1.default)(constant_1.USER_ROLE.admin), controller_1.CourseController.updateCourse);
router.delete("/:id", (0, authValidation_1.default)(constant_1.USER_ROLE.admin), controller_1.CourseController.deleteCourse);
router.put("/:courseId/assign-faculties", controller_1.CourseController.assignFacultiesInCourse);
router.delete("/:courseId/remove-faculties", controller_1.CourseController.removeFacultiesFromCourse);
exports.CourseRouter = router;
