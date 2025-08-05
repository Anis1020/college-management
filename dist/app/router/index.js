"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router_1 = require("../modules/user/router");
const router_2 = require("../modules/student/router");
const router_3 = require("../modules/semester/router");
const router_4 = require("../modules/academicFaculty/router");
const router_5 = require("../modules/department/router");
const router_6 = require("../modules/faculty/router");
const router_7 = require("../modules/admin/router");
const router_8 = require("../modules/course/router");
const router_9 = require("../modules/semesterRegistration/router");
const router_10 = require("../modules/offeredCourse/router");
const router = (0, express_1.Router)();
const routerProvider = [
    {
        path: "/users",
        route: router_1.UserRouter,
    },
    {
        path: "/students",
        route: router_2.StudentRouter,
    },
    {
        path: "/semesters",
        route: router_3.SemesterRouter,
    },
    {
        path: "/academicFaculties",
        route: router_4.AcademicFacultyRouter,
    },
    {
        path: "/departments",
        route: router_5.DepartmentRouter,
    },
    {
        path: "/faculties",
        route: router_6.FacultyRouter,
    },
    {
        path: "/admins",
        route: router_7.AdminRouter,
    },
    {
        path: "/courses",
        route: router_8.CourseRouter,
    },
    {
        path: "/semester-registrations",
        route: router_9.SemesterRegistrationRouter,
    },
    {
        path: "/offered-courses",
        route: router_10.OfferedCourseRouter,
    },
];
routerProvider.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
