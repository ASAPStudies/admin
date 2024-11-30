import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firebaseApp, firebaseAuth, firebaseDb } from 'src/configurations/firebase-config';
import { fromEvent } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DashboardService {
    constructor(private router: Router) {}
    timeOut: number = 180000;
    timeOutId: any = null;

    allEvents = ['click', 'dblclick', 'mousemove', 'mousedown', 'mouseup', 'keydown', 'keyup'];

    public initiateLister(callback: () => any) {
        this.allEvents.forEach((eventType: any) => {
            const event$ = fromEvent(document, eventType);
            event$.subscribe(() => this.resetTimer(callback));
        });
    }

    async getUsersTotal(role: string) {
        const q = query(collection(firebaseDb, 'users'), where('role', '==', role));
        const querySnapshot = await getDocs(q);
        return querySnapshot.size;
    }

    async getTransactionHistory() {
        let q = query(collection(firebaseDb, 'payment_history'));
        const querySnapshot = await getDocs(q);
        const data: any[] = [];
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });

        return data;
    }

    async getRequestsTotal() {
        const q = query(collection(firebaseDb, 'withdraws_requests'), where('status', '==', 'Pending'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.size;
    }

    async retrieveAllLiveRequests() {
        let q = query(collection(firebaseDb, 'sessions'));
        const querySnapshot = await getDocs(q);
        const data: any[] = [];
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });

        return data;
    }

    resetTimer(callback: any) {
        this.clearInterval();
        this.createInterval(callback);
    }

    private createInterval(callbck: () => any) {
        this.timeOutId = setTimeout(callbck, this.timeOut);
    }
    clearInterval() {
        clearTimeout(this.timeOutId);
    }
}
