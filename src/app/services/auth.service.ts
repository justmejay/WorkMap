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
  sendPasswordResetEmail,
  sendEmailVerification
} from '@angular/fire/auth';
import { send } from 'process';

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


  async signup({fname, mname, lname, suffix, 
    bday, age, street, barangay, town, country, province, specialization, }: 
    {fname: any, mname: any, lname: any, suffix: any, bday: any, age: any, street: any, barangay: any, 
    town: any, country:any, province: any, specialization: any, email: any, password: any}, email: any, password: any ){

    try {
      console.log
      const user = await createUserWithEmailAndPassword(
        this.auth,
        email, 
        password
      );

        
      const userget = this.auth.currentUser?.uid;
      console.log(userget);
      const imageUrl = ""
      
      const userDocRef = doc(this.firestore, `users/${userget}`);
      await setDoc(userDocRef, {uid: userget, specialization, profileimg: "",});

      const userDocRef1 = collection(this.firestore, `users/${userget}/profile`);
      await addDoc(userDocRef1, {fname, mname, lname, suffix, gender: "", contact: "", bday, age, email });
      

      const userDocRef2 = collection(this.firestore, `users/${userget}/address`);
      await addDoc(userDocRef2, {street, barangay, town, province, country});

      const userDocRef3 = collection(this.firestore, `users/${userget}/experience`);
      await addDoc(userDocRef3, {cname: "", caddress: "", jtitle: "", specialization: "", datef: "", datet:""});
      

      const userDocRef4 = collection(this.firestore, `users/${userget}/school`);
      await addDoc(userDocRef4, {level: "", schoolname: "", course: "", yearg: "", ongoing: "" });

      const userDocRef5 = collection(this.firestore, `users/${userget}/certifications`);
      await addDoc(userDocRef5, {name: "", orgn: "", year: "", fpath: "" });

      const userDocRef6 = collection(this.firestore, `users/${userget}/resume`);
      await addDoc(userDocRef6, {fpath: "" });

      await sendEmailVerification(this.auth.currentUser);

     
      return user;
    } catch (e) {
      return null;
    }
  }

  async signupc({fname, mname, lname, contact, 
    cname, ccontact, street, barangay, town, province,  country }: 
    {fname: any, mname: any, lname: any, contact: any, cname: any, ccontact: any, street: any, barangay: any
    , town: any, province: any, country: any }, email: any, 
    password: any ){

    try {
      console.log
      const user = await createUserWithEmailAndPassword(
        this.auth,
        email, 
        password
      );

        
      const userget = this.auth.currentUser?.uid;
      console.log(userget);
      const imageUrl = ""
      
      const userDocRef = doc(this.firestore, `employers/${userget}`);
      await setDoc(userDocRef, {uid: userget, profileimg: "",});

      const userDocRef1 = collection(this.firestore, `employers/${userget}/profile`);
      await addDoc(userDocRef1, {fname, mname, lname, contact});
      

      const userDocRef2 = collection(this.firestore, `employers/${userget}/company`);
      await addDoc(userDocRef2, {cname, ccontact, street, barangay, town, province, country, imageurl: ""});

      const userDocRef3 = collection(this.firestore, `employers/${userget}/experience`);
      await addDoc(userDocRef3, {cname: "", caddress: "", jtitle: "", specialization: "", datef: "", datet:""});
      

      await sendEmailVerification(this.auth.currentUser);

     
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


  async resend(){
    return sendEmailVerification(this.auth.currentUser)
  }

}
