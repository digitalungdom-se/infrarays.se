export type FileType =
  | "CV"
  | "COVER_LETTER"
  | "GRADES"
  | "RECOMMENDATION_LETTER"
  | "APPENDIX"
  | "ESSAY";

export type FileID = string;

export type FileInfo = {
  id: FileID;
  userId: string;
  type: FileType;
  created: string;
  name: string;
  mime: string;
};
