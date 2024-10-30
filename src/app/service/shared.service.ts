import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { collection, deleteDoc, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { firebaseDb, firebaseFunctions } from 'src/configurations/firebase-config';
import { IStudent } from '../pages/students/student.interface';
import { HttpClient } from '@angular/common/http';
import { httpsCallable } from 'firebase/functions';
import { IQuestion } from '../pages/students/question.interface';
import { ISession } from '../pages/students/session.interface';
export interface ISubject {
    id: string;
    backgroundImgUrl: string;
    enabled: boolean;
    fcmTopic: string;
    name: string;
  }

  export interface paymentKeys {
    id: string;
    live_publickey: string;
    live_secretkey: string;
    test_secretkey: string;
    test_publickey: string;
    live: boolean;
  }


@Injectable({
  providedIn: 'root'
})
export class SharedService {

constructor(private router:Router,private http:HttpClient) {
 }


  async sendNotification(notification:{title:string,body:string,token:string,isToken?:boolean}){
    try {
        // Call the Cloud Function
      const helloWorldFunction = httpsCallable(firebaseFunctions, 'sendNotification');

      // Invoke the function and get the result
      const result =  (await helloWorldFunction(notification));
      console.log(result); // This will contain the data sent back by the Cloud Function

    } catch (error) {
        console.error('Error calling helloWorld function:', error);
    }
  }



 async getAllSubjects() {
    const q = query(collection(firebaseDb, "subjects"));
    const querySnapshot = await getDocs(q);
    const subjects: any[] = [];
    querySnapshot.forEach(doc => {
        subjects.push({ id: doc.id, ...doc.data() });
    });
    return subjects;
}

async getQuestionByStudentID(studentId:string) {
    const q = query(collection(firebaseDb, "questions"),where('studentId','==',studentId),where('isPaid','==',true));
    const querySnapshot = await getDocs(q);
    const questions: any[] = [];
    querySnapshot.forEach(doc => {
        questions.push({ id: doc.id, ...doc.data() });
    });
    return questions;
}


async getQuestionByID(id:string) {
    const docRef = doc(firebaseDb, "questions", id);
    const question = await getDoc(docRef);
    if (question.exists()) {
        return question.data() as IQuestion ;
    } else {
        return null
    }
}

async getSessionByID(id:string) {
    const docRef = doc(firebaseDb, "sessions", id);
    const session = await getDoc(docRef);
    if (session.exists()) {
        return session.data() as ISession ;
    } else {
        return null
    }
}


async getQuestionByTutorID(tutorId:string) {
    const q = query(collection(firebaseDb, "questions"),where('answeyBy','==',tutorId));
    const querySnapshot = await getDocs(q);
    const questions: any[] = [];
    querySnapshot.forEach(doc => {
        questions.push({ id: doc.id, ...doc.data() });
    });
    return questions;
}

async getSessionsByStudentID(studentId:string) {
    const q = query(collection(firebaseDb, "sessions"),where('studentId','==',studentId),where('isPaid','==',true));
    const querySnapshot = await getDocs(q);
    const sessions: any[] = [];
    querySnapshot.forEach(doc => {
        sessions.push({ id: doc.id, ...doc.data() });
    });
    return sessions;
}

async getSessionsByTutorID(tutorId:string) {
    const q = query(collection(firebaseDb, "sessions"),where('acceptedBy','==',tutorId));
    const querySnapshot = await getDocs(q);
    const sessions: any[] = [];
    querySnapshot.forEach(doc => {
        sessions.push({ id: doc.id, ...doc.data() });
    });
    return sessions;
}

async getMeetingDetailsBySessionID(sessionId:string) {
    const q = query(collection(firebaseDb, "sessions",sessionId,'meeting_detail'));
    const querySnapshot = await getDocs(q);
    const meeting: any[] = [];
    console.log(querySnapshot.size);

    if(querySnapshot.size>0)
        {
            querySnapshot.forEach(doc => {
                meeting.push({ id: doc.id, ...doc.data() });
            });
            return meeting[0];
        }else{
            return null
        }
}


async getAnswerByQuestionID(tutorId:string,questionId:string) {
    const q = query(collection(firebaseDb, "users",tutorId,'answers_submitted'),where('questionId','==',questionId));
    const querySnapshot = await getDocs(q);
    const answers: any[] = [];
    console.log(querySnapshot.size);

    querySnapshot.forEach(doc => {
        answers.push({ id: doc.id, ...doc.data() });
    });
    return answers[0];
}

async getSubjectByID(subjectID:string) {
    const docRef = doc(firebaseDb, "subjects", subjectID);
    const subject = await getDoc(docRef);
    if (subject.exists()) {
        return subject.data() as ISubject ;
    } else {
        console.log("No Subject document!");
        return null
    }
}




async getPaymentKeys() {
    const docRef = doc(firebaseDb, "paymentkeys", 'urIm4w9XbqwwE40Ib8VO');
    const keys = await getDoc(docRef);
    if (keys.exists()) {
        return keys.data() as paymentKeys ;
    } else {
        console.log("No keys document found!");
        return null
    }
}


async getWithdrawRequestWithStatus(status:string='all') {
    let q;
    if(status == 'all'){
        q = query(collection(firebaseDb, "withdraws_requests"));
    }else
     q = query(collection(firebaseDb, "withdraws_requests"),where('status','==',status));
    const querySnapshot = await getDocs(q);
    const withdraws: any[] = [];
    querySnapshot.forEach(doc => {
        withdraws.push({ id: doc.id, ...doc.data() });
    });
    return withdraws;
}

async getNotificationTemplates(status:string='all') {
    let q = query(collection(firebaseDb, "notification_templates"));
    const querySnapshot = await getDocs(q);
    const templates: any[] = [];
    querySnapshot.forEach(doc => {
        templates.push({ id: doc.id, ...doc.data() });
    });
    return templates;
}

async deleteNotificationTemplates(collectionName:string,doc_id:string) {
    try {
        let q = (doc(firebaseDb, collectionName, doc_id));
        await deleteDoc(q);
        return true
    } catch (error) {
        console.log(error);
        return false

    }
}



}

