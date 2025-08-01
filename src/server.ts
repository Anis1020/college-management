import mongoose from "mongoose";
import app from "./app";
import { config } from "./app/config";

async function main() {
  await mongoose.connect(config.dbUrl as string);
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
}
main();
