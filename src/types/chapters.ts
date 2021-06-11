import { CustomSurveyQuestion } from "./survey";

export type Chapter = FileChapter | SurveyChapter | ReferenceChapter;

export type FileChapter = {
  id: string;
  type: "FILES";
  upload: {
    multiple: number;
    accept: ".pdf";
  };
};

export type SurveyChapter = {
  id: string;
  type: "SURVEY";
  questions: CustomSurveyQuestion[];
};

export type ReferenceChapter = {
  id: string;
  type: "RECOMMENDATION_LETTER";
  max: 3;
};
