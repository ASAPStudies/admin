import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, signOut,signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firebaseApp, firebaseAuth, firebaseDb } from 'src/configurations/firebase-config';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private router:Router) {
    const currentUser= getAuth(firebaseApp).currentUser
    console.log(currentUser);

    // if(currentUser){
    //     const admin = JSON.parse(localStorage.getItem('admin') as string)
    //     if(!admin){
    //         this.getUser(currentUser.email as string)
    //     }
    //     this.router.navigate(['/dashboard'])
    // }else{
    //     this.router.navigate(['/login'])

    // }
    console.log(getAuth(firebaseApp).currentUser);
 }
 async logUserIn(data:any){
      let ret:any = []
     const q = query(collection(firebaseDb, 'admin'), where('email', '==', data.email));
     const querySnapshot = await getDocs(q);
     
     querySnapshot.forEach((res) => {
        ret.push(res.data())
     });
     if (data.password === ret[0].password){
        localStorage.setItem('admin', JSON.stringify({email:ret[0].email, role:ret[0].role}))
        this.router.navigateByUrl('/dashboard')
     }else {
        alert("Invalid password")
     }
 }

 async signIn(email: string, password: string): Promise<any> {
   return signInWithEmailAndPassword(firebaseAuth, email, password);
 }

 async signOut(): Promise<void> {
   return signOut(firebaseAuth);
 }

 async checkUserIsAdmin(email: string): Promise<boolean> {
   const q = query(collection(firebaseDb, "admin"), where("email", "==", email));
   const querySnapshot = await getDocs(q);
   return !querySnapshot.empty;
 }


 async getUser(email:string){
    const q = query(collection(firebaseDb, "admin"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(res=>{
        localStorage.setItem('admin',JSON.stringify(res.data()))
    })
 }

 logOut(){
    signOut(firebaseAuth);
 }

}
