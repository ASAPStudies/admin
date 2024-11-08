import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { getAuth, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDoc, getDocs, query, where, doc, updateDoc, addDoc, Timestamp, FieldValue, increment } from 'firebase/firestore';
import { firebaseApp, firebaseAuth, firebaseDb } from 'src/configurations/firebase-config';
import { IStudent } from '../pages/students/student.interface';

@Injectable({
    providedIn: 'root',
})
export class DashboardService {
    constructor(private router: Router) {}

    async getAdmin(email: string) {
        let allUsers: any[] = [];
        const q = query(collection(firebaseDb, 'admin'), where('email', '==', email));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.size !== 1) {
            throw new Error('User not found');
        }
        querySnapshot.forEach((each) => {
            allUsers.push(each.data());
        });
        return allUsers[0];
    }

    async getUsersTotal(role: string) {
        const q = query(collection(firebaseDb, 'users'), where('role', '==', role));
        const querySnapshot = await getDocs(q);
        return querySnapshot.size;
    }

    async getRequestsTotal() {
        const q = query(collection(firebaseDb, 'withdraws_requests'), where('status', '==', 'Pending'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.size;
    }

    async retrieveAllLiveRequests() {
        let data: any[] = [];
        const querySnapshot = await getDocs(collection(firebaseDb, 'sessions'));
        querySnapshot.forEach((each) => {
            data.push(each.data());
        });

        return data;
    }

    async updateUserAccount(user:any, amount: any) {
        const uuid = user.id
        amount = parseFloat(amount)
        
        const tutorRef = doc(firebaseDb, 'users', uuid);

        await updateDoc(tutorRef, {
            balance: increment(amount)
        });
    }

    async payAllUsers(userList: any, amount:any) {
        await userList.map((user:any)=> {
            this.updateUserAccount(user, amount).then(async ()=>{
                await this.updateTransactionHistory(user, amount)
            }).catch((err)=>{
                throw new Error("There was an error")
            })
        })
    }

    async updateTransactionHistory(user:any, amount:any){
        addDoc(collection(firebaseDb, 'payment_history'), {
            userId:user.id,
            email:user.email,
            time:Timestamp.now(),
            full_name:user.name,
            amount:amount,
            currency:'GHS'
        })
    }

    async getTransanctionHistory() {
         let data: any[] = [];
         const querySnapshot = await getDocs(collection(firebaseDb, 'payment_history'));
         querySnapshot.forEach((each) => {
             data.push(each.data());
         });

         return data;
    }
}
