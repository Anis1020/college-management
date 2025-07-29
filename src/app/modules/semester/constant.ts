import { TCode, TMonths, TName, TSemesterNameCodeMapper } from "./interface";

export const SemesterMonths: TMonths[] = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

export const SemesterNames: TName[] = ["summer", "fall", "winter"];

export const SemesterCodes: TCode[] = ["01", "02", "03"];

export const semesterNameCodeMapper: TSemesterNameCodeMapper = {
  summer: "01",
  fall: "02",
  winter: "03",
};
