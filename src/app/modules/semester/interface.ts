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

export type TSemester = {
  name: string;
  year: string;
  code: "01" | "02" | "03" | "04";
  startMonth: TMonths;
  endMonth: TMonths;
};
