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


  async signup({fname, mname, lname, suffix, cs, religion, sex, bday, age, contact, specialization, homeaddress, currentaddress, currentcoords, }: 
    {fname: any, mname: any, lname: any, suffix: any, cs: any, religion: any, sex : any , bday: any, age: any, contact:any, specialization: any, selectedCurrent: any,currentaddress:any, homeaddress:any, currentcoords: any, homecoords: any, homePlaceID: any, selectedHome: any,
     }, email: any, 
    password: any,
    
    
     ){

    try {
      console.log
      const user = await createUserWithEmailAndPassword(
        this.auth,
        email, 
        password,

      );

        
      const userget = this.auth.currentUser?.uid;
      console.log(userget);
      const imageUrl = ""

      const userDocRef1 = doc(this.firestore, `users/${userget}/profile/${userget}`);
      await setDoc(userDocRef1, {uid: userget, specialization, profileimg: "", aboutme: "", cs,religion,  fname, mname, lname, suffix, sex, contact, bday, age, email });
      
       

      const userDocRef2 = doc(this.firestore, `users/${userget}/address/${userget}`);
      await setDoc(userDocRef2, {clat: currentcoords.lat, clng: currentcoords.lng,
        homeaddress, currentaddress, changed: false });

      const userDocRef3 = collection(this.firestore, `users/${userget}/experience`);
      await addDoc(userDocRef3, {cname: "", caddress: "", jtitle: "", datef: "", datet:""});
      

      const userDocRef4 = collection(this.firestore, `users/${userget}/school`);
      await addDoc(userDocRef4, {level: "", schoolname: "", course: "", yearg: "", ongoing: "" });

      const userDocRef5 = collection(this.firestore, `users/${userget}/certifications`);
      await addDoc(userDocRef5, {name: "", orgn: "", year: "", fpath: "", filename: "" });

      const userDocRef6 = doc(this.firestore, `users/${userget}/resume/${userget}`);
      await setDoc(userDocRef6, {filename: "" ,fpath: "" , mo: "", moc: "", fa: "", fac: ""});

      await sendEmailVerification(this.auth.currentUser);

     
      return user;
    } catch (e) {
      return null;
    }
  }

 
  async signupc({fname, mname, lname, contact, 
    cname, ccontact, companyaddress, currentPlaceID, currentcoordss, cemail }: 
    {fname: any, mname: any, lname: any, contact: any, email:any, cname: any, ccontact: any, companyaddress: any, currentPlaceID: any, currentcoordss: any , cemail: any }, email: any, 
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
      

      const userDocRef1 = doc(this.firestore, `employers/${userget}/profile/${userget}`);
      await setDoc(userDocRef1, {fname, mname, lname, contact, email, uid: userget, profileimg: ""});
      

      const userDocRef2 = doc(this.firestore, `employers/${userget}/company/${userget}`);
      await setDoc(userDocRef2, {cname, ccontact, currentPlaceID,lat: currentcoordss.lat,lng: currentcoordss.lng,
      companyaddress,   imageurl: "", 
      cemail, csize: "", cdetails: "", cprocessingtime1: "", cprocessingtime2: "", cbenefits: ""});


  
      await sendEmailVerification(this.auth.currentUser);

     
      return user;
    } catch (e) {
      return null;
    }
  }

  async getid(){

    const id = this.auth.currentUser.uid;
    return id;

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
