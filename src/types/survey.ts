export type StatisticalValue = "average";

export interface NumericalStatistic {
  average?: number;
  count: Record<string | number, number>;
}

export type Gender = "MALE" | "FEMALE" | "OTHER" | "UNDISCLOSED";
export type Grade = 1 | 2 | 3 | 4 | 5;

export interface SurveyAnswers {
  city: string;
  school: string;
  gender: Gender;
  applicationPortal: number;
  applicationProcess: number;
  improvement: string;
  informant: string;
  applicantId?: string;
}

export interface Statistics {
  applicationProcess: NumericalStatistic;
  applicationPortal: NumericalStatistic;
  improvement: string[];
  informant: string[];
  city: string[];
  school: string[];
  gender: { count: Record<Gender, number> };
}

export type CustomSurveyQuestion = SurveyTextQuestion | SurveyRangeQuestion;

export type SurveyTextQuestion = {
  type: "TEXT";
  maxLength?: number;
  id?: string;
};

export type SurveyRangeQuestion = {
  type: "RANGE";
  range?: [number, number];
  id?: string;
};

export type CustomSurveyAnswer = {
  id?: string;
  value: number | string;
};
