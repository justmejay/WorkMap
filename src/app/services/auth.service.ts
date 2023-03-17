import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { updateDoc} from 'firebase/firestore';
import { doc, docData, Firestore, setDoc, collection, addDoc, collectionData, deleteDoc, where } from '@angular/fire/firestore';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  getAuth,
  sendPasswordResetEmail
} from '@angular/fire/auth';

export interface User{
  //id is optional and not required
  id?: string,
  email: string;
  uid:string;

}



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: Auth,
    private firestore: Firestore,
  ) { }


  async signup({email, password}: {email: any, password: any}){

    try {
      const user = await createUserWithEmailAndPassword(
        this.auth,
        email, 
        password
      );

        
      const userget = this.auth.currentUser?.uid;
      console.log(userget);
      const imageUrl = ""
      const userDocRef = doc(this.firestore, `users/${userget}`);
      await setDoc(userDocRef, {email, uid: userget});
     
      return user;
    } catch (e) {
      return null;
    }
  }


  async login({ email, password }: {email:any, password: any}) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (e) {
      return null;
    }
  }


  logout() {
    return signOut(this.auth);
  }


  async forgot({email}: {email: any}){
    try {
      const uemail = email;
      const user = await sendPasswordResetEmail(this.auth, uemail);
      return user;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

}
