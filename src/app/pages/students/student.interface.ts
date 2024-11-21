import { ISubject } from "src/app/service/shared.service";

export interface IStudent {
    id: string;
    role: string;
    country: string;
    gender: string;
    subjects?: string[] | null;
    subjectObjs?: ISubject[] | null;
    balance: number;
    email: string;
    status: boolean;
    dateofbirth: DateofbirthOrUpdatedOnOrCreatedOn;
    idNumber: string;
    onHold: boolean;
    name: string;
    nationalID: string;
    updatedOn: DateofbirthOrUpdatedOnOrCreatedOn;
    createdOn: DateofbirthOrUpdatedOnOrCreatedOn;
    phone: string;
    imageUrl: string;
    provider: string;
    idImageurl: string;
    isComplete: boolean;
    fcmToken: string;
  }
  export interface DateofbirthOrUpdatedOnOrCreatedOn {
    seconds: number;
    nanoseconds: number;
  }


  export interface ITutor extends IStudent {
    
  }

