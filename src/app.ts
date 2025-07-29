import express from "express";
import cors from "cors";
import router from "./app/router";
import globalErrorHandler from "./app/errors/globalError";
import notFound from "./app/errors/notFount";
const app = express();

//middleware
app.use(cors());
app.use(express.json());

app.use("/api/v1", router);

//global error handler
app.use(globalErrorHandler);

//not fount route
app.use(notFound);
export default app;
