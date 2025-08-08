"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRouter = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
router.post("/create-course", 
// authValidation(USER_ROLE.admin),
controller_1.CourseController.createCourse);
router.get("/", controller_1.CourseController.getAllCourses);
router.get("/:id", controller_1.CourseController.getSingleCourse);
router.patch("/:id", 
// authValidation(USER_ROLE.admin),
controller_1.CourseController.updateCourse);
router.delete("/:id", 
// authValidation(USER_ROLE.admin),
controller_1.CourseController.deleteCourse);
router.put("/:courseId/assign-faculties", controller_1.CourseController.assignFacultiesInCourse);
router.delete("/:courseId/remove-faculties", controller_1.CourseController.removeFacultiesFromCourse);
exports.CourseRouter = router;
