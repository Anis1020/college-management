import { Router } from "express";
import { UserRouter } from "../modules/user/router";
import { StudentRouter } from "../modules/student/router";
import { SemesterRouter } from "../modules/semester/router";
import { AcademicFacultyRouter } from "../modules/academicFaculty/router";

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
];
routerProvider.forEach((route) => {
  router.use(route.path, route.route);
});
export default router;
