import { Router } from "express";
import { UserRouter } from "../modules/user/router";
import { StudentRouter } from "../modules/student/router";
import { SemesterRouter } from "../modules/semester/router";
import { AcademicFacultyRouter } from "../modules/academicFaculty/router";
import { DepartmentRouter } from "../modules/department/router";
import { FacultyRouter } from "../modules/faculty/router";
import { AdminRouter } from "../modules/admin/router";
import { CourseRouter } from "../modules/course/router";

const router = Router();
const routerProvider = [
  {
    path: "/users",
    route: UserRouter,
  },
  {
    path: "/students",
    route: StudentRouter,
  },
  {
    path: "/semesters",
    route: SemesterRouter,
  },
  {
    path: "/academicFaculties",
    route: AcademicFacultyRouter,
  },
  {
    path: "/departments",
    route: DepartmentRouter,
  },
  {
    path: "/faculties",
    route: FacultyRouter,
  },
  {
    path: "/admins",
    route: AdminRouter,
  },
  {
    path: "/courses",
    route: CourseRouter,
  },
];
routerProvider.forEach((route) => {
  router.use(route.path, route.route);
});
export default router;
