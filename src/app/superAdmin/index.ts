import { UserModel } from "../modules/user/schemaModel";

const superUser = {
  id: "0001",
  email: "herpowerbd@gmail.com",
  password: "superAdmin",
  needPasswordChange: false,
  role: "super-admin",
  status: "in-progress",
  isDeleted: false,
};

const seedSuperAdmin = async () => {
  const isAdminExist = await UserModel.findOne({ role: "super-admin" });
  if (!isAdminExist) {
    await UserModel.create(superUser);
  }
};

export default seedSuperAdmin;
