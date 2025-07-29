import { catchAsync } from "../../utils/catchAsync";
import { SemesterService } from "./services";

const createSemester = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await SemesterService.createSemesterIntoDB(payload);
  res.status(201).json({
    success: true,
    message: "Semester created successfully",
    data: result,
  });
});

export const SemesterControllers = {
  createSemester,
};
