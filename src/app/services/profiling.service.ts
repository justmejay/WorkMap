import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc, collection, addDoc, collectionData, deleteDoc, where } from '@angular/fire/firestore';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadString,
} from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';
import { collectionGroup, CollectionReference, updateDoc, WhereFilterOp } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface User{
  //id is optional and not required
  //profile
  id?: string,
  profileimg: string,
  specialization: string,
  age: number,
  bday: string,
  contact: number, 
  email: string,
  fname: string,
  gender: string,
  lname: string,
  mname: string,
  suffix: string,

  //address
  barangay: string,
  country: string,
  province: string,
  town: string,
  street: string,

  //certifications

  fpath: string,
  name: string,
  orgn: string, 
  year: number,

  //experience
  caddress: string,
  cname: string,
  datef: string,
  datet: string,
  jtitle: string,

  //school
  course:string,
  level: string,
  ongoing: string,
  schoolname: string,
  yearg: string,



  
}


@Injectable({
  providedIn: 'root'
})
export class ProfilingService {

  constructor(
    private firestore: Firestore,
    private auth: Auth,
  ) { }


  
  getprofile(): Observable<User[]>{
    const id = this.auth.currentUser.uid;
  
    const cakesRef = doc(this.firestore, `users/${id}/profile/${id}/`)
    return docData(cakesRef, {idField: 'id'}) as Observable<[User]>
  }

  getaddress(): Observable<User[]>{
    const id = this.auth.currentUser.uid;
  
    const cakesRef = doc(this.firestore, `users/${id}/address/${id}`)
    return docData(cakesRef, {idField: 'id'}) as Observable<[User]>
  }

  getcertification(): Observable<User[]>{
    const id = this.auth.currentUser.uid;
  
    const cakesRef = collection(this.firestore, `users/${id}/certification`)
    return collectionData(cakesRef, {idField: 'id'}) as Observable<[User]>
  }

  getschool(): Observable<User[]>{
    const id = this.auth.currentUser.uid;
  
    const cakesRef = collection(this.firestore, `users/${id}/school`)
    return collectionData(cakesRef, {idField: 'id'}) as Observable<[User]>
  }

  getresume(): Observable<User[]>{
    const id = this.auth.currentUser.uid;
  
    const cakesRef = collection(this.firestore, `users/${id}/resume`)
    return collectionData(cakesRef, {idField: 'id'}) as Observable<[User]>
  }

  getexperience(): Observable<User[]>{
    const id = this.auth.currentUser.uid;
  
    const cakesRef = collection(this.firestore, `users/${id}/experience`)
    return collectionData(cakesRef, {idField: 'id'}) as Observable<[User]>
  }



  async addex({cname, caddress, jtitle, datet, datef }: 
    {cname: any, caddress: any, jtitle: any, datet: any, datef: any } ){

    try {
      
      const userget = this.auth.currentUser?.uid;
      const userDocRef3 = collection(this.firestore, `users/${userget}/experience`);
      const user = await addDoc(userDocRef3, {cname, caddress, jtitle, datef, datet});
     
      return user;
    } catch (e) {
      return null;
    }
  }

  getExpbyID(id:any):Observable<User>{
    const  uid =  this.auth.currentUser.uid;
    const cakesByIdRef = doc(this.firestore, `users/${uid}/experience/${id}`)
    return docData(cakesByIdRef, {idField: 'id'}) as Observable <User>
  }

  async editex({cname, caddress, jtitle, datet, datef }: 
    {cname: any, caddress: any, jtitle: any, datet: any, datef: any }, experience: any ){

    try {
      console.log("exp: id" + experience)
      const userget = this.auth.currentUser?.uid;
      const userDocRef3 = doc(this.firestore, `users/${userget}/experience/${experience}`);
      const user = await updateDoc(userDocRef3, {cname, caddress, jtitle, datef, datet});
     
      return true;
    } catch (e) {
      return null;
    }
  }

  async editprofile({fname, mname, lname, suffix, bday,contact, age,sex}: 
    {fname: any, mname: any, lname: any, suffix: any, contact: any, bday: any, age: any, sex: any}){

    try {
      const userget = this.auth.currentUser?.uid;
      const userDocRef3 = doc(this.firestore, `users/${userget}/profile/${userget}`);
      const user = await updateDoc(userDocRef3, {fname, lname, mname,suffix, bday, contact, age , sex});
     
      return true;
    } catch (e) {
      return null;
    }
  }

  async editaddress({street, barangay, town, province, country, hstreet, hbarangay, htown, hprovince, hcountry}: 
    {street: any, barangay: any, town: any, province: any, country: any, hstreet: any, hbarangay: any, htown: any, hprovince: any, hcountry: any}){

    try {
      const userget = this.auth.currentUser?.uid;
      const userDocRef3 = doc(this.firestore, `users/${userget}/address/${userget}`);
      const user = await updateDoc(userDocRef3, {street, barangay, town, province, country, hstreet, hbarangay, htown, hprovince, hcountry});
     
      return true;
    } catch (e) {
      return null;
    }
  }


  async addsc({schoolname, yearg, level, course }: 
    {schoolname: any, yearg: any, level: any, course: any } ){

    try {
      
      const userget = this.auth.currentUser?.uid;
      const userDocRef3 = collection(this.firestore, `users/${userget}/school`);
      const user = await addDoc(userDocRef3, {schoolname, yearg, level, course});
     
      return user;
    } catch (e) {
      return null;
    }
  }

  getscbyID(id:any):Observable<User>{
    const  uid =  this.auth.currentUser.uid;
    const cakesByIdRef = doc(this.firestore, `users/${uid}/school/${id}`)
    return docData(cakesByIdRef, {idField: 'id'}) as Observable <User>
  }


  
  async editschool({schoolname, yearg, level, course}: 
    {schoolname: any, yearg: any, level: any, course: any}, schoold: any){

    try {
      const userget = this.auth.currentUser?.uid;
      const userDocRef3 = doc(this.firestore, `users/${userget}/school/${schoold}`);
      const user = await updateDoc(userDocRef3, {schoolname, yearg, level, course});
     
      return true;
    } catch (e) {
      return null;
    }
  }


  async editprofiledp(imageUrl: any){

    try {
      const userget = this.auth.currentUser?.uid;
      const userDocRef3 = doc(this.firestore, `users/${userget}/profile/${userget}`);
      const user = await updateDoc(userDocRef3, {imageUrl});
     
      return true;
    } catch (e) {
      return null;
    }
  }

}
