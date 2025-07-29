import z from "zod";
import { SemesterCodes, SemesterMonths, SemesterNames } from "./constant";

const createSemesterValidation = z.object({
  body: z.object({
    name: z.enum([...SemesterNames]),
    year: z.string(),
    code: z.enum([...SemesterCodes]),
    startMonth: z.enum([...SemesterMonths]),
    endMonth: z.enum([...SemesterMonths]),
  }),
});

const updateSemesterValidation = z.object({
  body: z.object({
    name: z.enum([...SemesterNames]).optional(),
    year: z.string().optional(),
    code: z.enum([...SemesterCodes]).optional(),
    startMonth: z.enum([...SemesterMonths]).optional(),
    endMonth: z.enum([...SemesterMonths]).optional(),
  }),
});

export const SemesterValidations = {
  createSemesterValidation,
  updateSemesterValidation,
};
