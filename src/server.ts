import mongoose from "mongoose";
import app from "./app";
import { config } from "./app/config";
import seedSuperAdmin from "./app/superAdmin";

async function main() {
  await mongoose.connect(config.dbUrl as string);
  seedSuperAdmin();
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
}
main();
