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
  
    const cakesRef = collection(this.firestore, `users/${id}/profile`)
    return collectionData(cakesRef, {idField: 'id'}) as Observable<[User]>
  }

  getaddress(): Observable<User[]>{
    const id = this.auth.currentUser.uid;
  
    const cakesRef = collection(this.firestore, `users/${id}/address`)
    return collectionData(cakesRef, {idField: 'id'}) as Observable<[User]>
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

}
