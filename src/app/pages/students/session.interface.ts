import { IStudent } from "./student.interface";

export interface ISession {
    id: string;
    amount: number;
    subject: string;
    acceptedBy: string;
    attachmentUrl: string;
    acceptTime: CreatedOnOrDateofbirthOrUpdatedOnOrAcceptTimeOrDueDate;
    status: string;
    dueDate: CreatedOnOrDateofbirthOrUpdatedOnOrAcceptTimeOrDueDate;
    currency: string;
    studentId: string;
    description: string;
    createdOn: CreatedOnOrDateofbirthOrUpdatedOnOrAcceptTimeOrDueDate;
    tutor: IStudent;
    isPaid:boolean
  }
  export interface CreatedOnOrDateofbirthOrUpdatedOnOrAcceptTimeOrDueDate {
    seconds: number;
    nanoseconds: number;
  }


