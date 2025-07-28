import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export const config = {
  node_env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  dbUrl: process.env.DB_URL || "mongodb://localhost:27017/myapp",
  jwtSecret: process.env.JWT_SECRET,
};
