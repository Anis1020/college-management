import { Router } from "express";
import { UserRouter } from "../modules/user/router";

const router = Router();
const routerProvider = [
  {
    path: "/users",
    router: UserRouter,
  },
  {
    path: "/students",
    router: UserRouter,
  },
];
routerProvider.forEach((route) => {
  router.use(route.path, route.router);
});
export default router;
