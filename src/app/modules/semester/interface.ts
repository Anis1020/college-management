export type TMonths =
  | "january"
  | "february"
  | "march"
  | "april"
  | "may"
  | "june"
  | "july"
  | "august"
  | "september"
  | "october"
  | "november"
  | "december";
export type TName = "summer" | "fall" | "winter";
export type TCode = "01" | "02" | "03";
export type TSemester = {
  name: TName;
  year: string;
  code: TCode;
  startMonth: TMonths;
  endMonth: TMonths;
};

export type TSemesterNameCodeMapper = {
  [key: string]: string;
};
