/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import { onDocumentUpdated} from "firebase-functions/v2/firestore";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";

import serviceAccount from "./../serviceAccountKey"

// Initialize Firebase Admin with service account credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  // Optionally add other configuration options here (e.g., databaseURL)
});
export interface timeStamp {
    seconds: number;
    nanoseconds: number;
  }
interface meeting {join_url:string,start_url:string,start_time:timeStamp,status:string,topic:string,timezone:string}
interface ISession {
    id: string;
    amount: number;
    subject: string;
    acceptedBy: string;
    attachmentUrl: string;
    acceptTime: Date;
    status: string;
    dueDate: Date;
    currency: string;
    studentId: string;
    description: string;
    createdOn: Date;
    tutor: IUser;
  }
  interface ISubject {
    id: string;
    backgroundImgUrl: string;
    enabled: boolean;
    fcmTopic: string;
    name: string;
  }
interface IUser {
    id: string;
    role: string;
    country: string;
    gender: string;
    subjects?: string[] | null;
    subjectObjs?: ISubject[] | null;
    balance: number;
    email: string;
    status: boolean;
    dateofbirth: Date;
    idNumber: string;
    onHold: boolean;
    name: string;
    nationalID: string;
    updatedOn: Date;
    createdOn: Date;
    phone: string;
    imageUrl: string;
    provider: string;
    idImageurl: string;
    isComplete: boolean;
    fcmToken: string;
  }


export const helloWorld = onRequest({cors:true}, async (request, response) => {
  logger.info("Hello logs!", {structuredData: true});

  response.send("Hello from Firebase!");

});


export const sendSessionEmail =  onDocumentUpdated('sessions/{docId}' , async (event) => {
    const beforeData = event.data?.before.data();
    const afterData = event.data?.after.data();

    const changedFields = [];
    let tutorId:string = '';
    for (const field in beforeData) {
      if (afterData && beforeData[field] !== afterData[field]) {
        changedFields.push(field);
        if(field == 'acceptedBy'){
            tutorId = afterData[field]
        }
        logger.info(`Field "${field}" changed from "${beforeData[field]}" to "${afterData[field]}"`);
      }
    }

    // Use changedFields to determine if email needs to be sent
    if (changedFields.includes('acceptedBy')) {

        try {
            const {studentId,id} = event.data?.after.data() as ISession

            let meetingDetails!:meeting;
            let result = await admin.firestore().collection(`sessions/${id}/meeting_detail`).get()
            result.forEach(res=>  meetingDetails = res.data() as meeting)

            const student =  await getUserByUID(studentId);
            const tutor = await getUserByUID(tutorId);
            const start_time = new Date(meetingDetails.start_time.seconds * 1000 + meetingDetails.start_time.nanoseconds / 1000000)
            const emailToStudent = {
            to: student?.email,
            message: {
                subject: "Live Session Zoom Invite",
                html: `
                    <p>Dear ${student?.name},</p>
                    <br>
                    <p>Your Live Session has been accepted by the tutor (${tutor?.name}).</p>
                    <br>
                    <p>Your Live session will be start at ${start_time.toLocaleString('en-US', { timeZone: meetingDetails.timezone })}. And click the below button to join the meeting.</p>
                    <br>
                    <p>${meetingDetails.start_url}</p>
                `,
                },
            };
          const emailToTutor = {
            to: tutor?.email,
            message: {
                subject: "Live Session Zoom Invite",
                html: `
                    <p>Dear ${tutor?.name},</p>
                    <br>
                    <p>You have accept the Live Session of the student (${student?.name}).</p>
                    <br>
                    <p>Your Live session will be start at ${start_time.toLocaleString('en-US', { timeZone: meetingDetails.timezone })}. And click the below button to join the meeting.</p>
                    <br>
                    <p>${meetingDetails.join_url}</p>
                `,
                },
                };

            await admin.firestore().collection("mail").add(emailToStudent);
            await admin.firestore().collection("mail").add(emailToTutor);
        } catch (error) {
            logger.info("Error", error);
        }
    }
 });

 const getUserByUID =  async(uid:string)=> {
     const result = await admin.firestore().collection('users').doc(uid).get();
     if (result.exists) {
        return result.data() as IUser;
    } else {
        console.log("No such document!");
        return null
    }
}

exports.sendNotification = onRequest({cors:true}, async (request, response) => {
    const {title,body,token,isToken = true} = request.body?.data
    let message:any = {
        notification: {
            title,
            body
        },
    };
    if(isToken)
    message.token = token

    try {
        const result = await isToken? admin.messaging().send(message): admin.messaging().sendToTopic(token,message)
        logger.info("notification success!", result);
        response.json({data:{ success: true,message:'Notification sent!' }});
    } catch (error:any) {
        logger.info("notification error!", error);
        response.json({data:{ success: false,message: error.message }});

    }
});

