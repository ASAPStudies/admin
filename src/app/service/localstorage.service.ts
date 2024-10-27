import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firebaseDb } from 'src/configurations/firebase-config';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

constructor() {}

set(key:string,data:any){
    localStorage.setItem(key,JSON.stringify(data))
}

get(key:string){
   return JSON.parse(localStorage.getItem(key) ?? 'false')
}

delete(key:string){
    localStorage.removeItem(key)
}


deleteAll(){
    localStorage.clear()
}

}

