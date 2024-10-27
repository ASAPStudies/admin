import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { firebaseDb } from 'src/configurations/firebase-config';
import { IStudent } from '../pages/students/student.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

constructor(private router:Router) {
 }




 async getUsers(role:string) {
    const q = query(collection(firebaseDb, "users"),where('role','==',role));
    const querySnapshot = await getDocs(q);
    const students: any[] = [];
    querySnapshot.forEach(async doc => {
        let data:any = { id: doc.id, ...doc.data() }
        students.push(data);
    });
    return students;
}

async getUserByUID(uid:string) {
    const docRef = doc(firebaseDb, "users", uid);
    const student = await getDoc(docRef);

    if (student.exists()) {
        return student.data();
    } else {
        console.log("No such document!");
        return null
    }
}

async updateAccountStatus(status:boolean,userId:string){
    try {
        const query = doc(firebaseDb, "users", userId);
        let abc =await updateDoc(query, {
        onHold: status
        });
        console.log(abc);
        return true

    } catch (error) {
        console.log(error);
        return false
    }
}

async createDocument(collectionName:string ,data:any) {
    try {
      let id = Math.random().toString(20).substring(2);

      // Add the document with the ID and data
      await setDoc(doc(firebaseDb, collectionName, id), { id, ...data });
      console.log("Document added successfully with ID:", id);
      return true;
    } catch (error) {
      console.error("Error adding document:", error);
      return false;
    }
  }

  async createDocumentChildCollection(collectionName:string,doc_id:string,subCollectionName:string ,data:any) {
    try {
        let id = Math.random().toString(20).substring(2);

        // Add the document with the ID and data
        await setDoc(doc(firebaseDb, `${collectionName}/${doc_id}/${subCollectionName}`,id), { id, ...data });
        console.log("Document added successfully with ID:", id);
        return true;
      } catch (error) {
        console.error("Error adding document:", error);
        return false;
      }
  }


async updateDocWithId(collection:string, doc_id:string ,data:any) {
    try {
      await updateDoc(doc(firebaseDb, collection, doc_id), data);
      console.log("Document updated successfully with ID:", doc_id);
    } catch (error:any) {
      console.error("Error updating document:", error);
      throw new Error(error.message);
    }
  }


async getTutorBankDetails(tutorId:string){
    const q = query(collection(firebaseDb, "users",tutorId,'bank_details'));
    const querySnapshot = await getDocs(q);
    const bankDetail: any[] = [];
    if(querySnapshot.size ==0){
        return null
    }
    querySnapshot.forEach(doc => {
        bankDetail.push({ id: doc.id, ...doc.data() });
    });
    return bankDetail[0];
}


async getTutorPaymentRequests(tutorId:string){
    const q = query(collection(firebaseDb, "users",tutorId,'withdraws'));
    const querySnapshot = await getDocs(q);
    const requests: any[] = [];
    if(querySnapshot.size ==0){
        return []
    }
    querySnapshot.forEach(doc => {
        requests.push({ id: doc.id, ...doc.data() });
    });
    console.log("requests",requests);

    return requests;
}




}

