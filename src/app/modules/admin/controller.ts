import { catchAsync } from "../../utils/catchAsync";
import { AdminServices } from "./services";

const getAllAdmins = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllAdminsFromDB();
  res.status(200).json({
    success: true,
    message: "get all admin successfully",
    data: result,
  });
});
const getSingleAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.getSingleAdminFromDB(id);
  res.status(200).json({
    success: true,
    message: "get single admin successfully",
    data: result,
  });
});

const updateAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.updateAdminIntoDB(id, req.body);
  res.status(200).json({
    success: true,
    message: "update admin successfully",
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.deleteAdminFromDB(id);
  res.status(200).json({
    success: true,
    message: "delete admin successfully",
    data: result,
  });
});

export const AdminController = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
