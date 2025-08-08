"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrolledCourseRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
router.post("/create-enrolled-course", 
//   authValidation(USER_ROLE.student),
controller_1.EnrolledCourseController.createEnrolledCourse);
exports.EnrolledCourseRoutes = router;
