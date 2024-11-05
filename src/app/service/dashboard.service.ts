import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { getAuth, signOut,signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import { firebaseApp, firebaseAuth, firebaseDb } from 'src/configurations/firebase-config';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

constructor(private router:Router) {

}

async getAdmin(email:string){
   let allUsers:any[] = []
   const q = query(collection(firebaseDb, "admin"),where('email','==',email));
   const querySnapshot = await getDocs(q);
   if (querySnapshot.size !==1){
    throw new Error('User not found')
   }
   querySnapshot.forEach((each)=> {
    allUsers.push(each.data())
   })
   return allUsers[0]
}


 async getUsersTotal(role:string) {
    const q = query(collection(firebaseDb, "users"),where('role','==',role));
    const querySnapshot = await getDocs(q);
     return querySnapshot.size;
}

async getRequestsTotal() {
    const q = query(collection(firebaseDb, "withdraws_requests"),where('status','==','Pending'));
    const querySnapshot = await getDocs(q);
     return querySnapshot.size;
}

async retrieveAllLiveRequests(){
   let data:any[] = []
   const querySnapshot = await getDocs(collection(firebaseDb, 'sessions'))
   querySnapshot.forEach((each)=> {
      
      data.push(each.data())
   })

   return data;
}


}

