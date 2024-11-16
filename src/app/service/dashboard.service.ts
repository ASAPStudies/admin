import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { getAuth, signOut,signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firebaseApp, firebaseAuth, firebaseDb } from 'src/configurations/firebase-config';

@Injectable({
    providedIn: 'root',
})
export class DashboardService {
    constructor(private router: Router) {}

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
      let q = query(collection(firebaseDb, 'sessions'));
      const querySnapshot = await getDocs(q);
      const data: any[] = [];
      querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
      });


      return data;
    }
}

