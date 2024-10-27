import { IStudent } from "./student.interface";

export interface IQuestion {
    id: string;
    answerBody: string;
    attachmentUrl: string;
    answeyBy: string;
    status: string;
    questionBody: string;
    studentId: string;
    createdOn: CreatedOnOrDueDateOrAnswerTime;
    dueDate: CreatedOnOrDueDateOrAnswerTime;
    answerAttachmentUrl: string;
    answerTime: CreatedOnOrDueDateOrAnswerTime;
    currency: string;
    subject: string;
    amount: number;
    tutor?: IStudent;
    isPaid?:boolean;
  }
  export interface CreatedOnOrDueDateOrAnswerTime {
    seconds: number;
    nanoseconds: number;
  }
