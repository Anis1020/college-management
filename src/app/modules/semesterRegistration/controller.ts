import { catchAsync } from "../../utils/catchAsync";
import { SemesterRegistrationServices } from "./services";

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationServices.createSemesterRegistrationIntoD(
      req.body
    );
  res.status(200).json({
    success: true,
    message: "semester registration created successfully",
    data: result,
  });
});
const getAllSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationServices.getAllSemesterRegistrationIntoD();
  res.status(200).json({
    success: true,
    message: "get single semester registration  successfully",
    data: result,
  });
});
const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await SemesterRegistrationServices.getSingleSemesterRegistrationIntoD(id);
  res.status(200).json({
    success: true,
    message: "get single semester registration successfully",
    data: result,
  });
});
const updateSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await SemesterRegistrationServices.updateSemesterRegistrationIntoD(id);
  res.status(200).json({
    success: true,
    message: "semester registration update successfully",
    data: result,
  });
});

export const SemesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
};
