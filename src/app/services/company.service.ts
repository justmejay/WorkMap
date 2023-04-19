import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc, collection, addDoc, collectionData, deleteDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { collectionGroup, CollectionReference, query, Query, queryEqual, updateDoc, WhereFilterOp } from 'firebase/firestore';

export interface Company{
  //id is optional and not required
  //company
  id?: string,
  cname:string,
  street:string,
  barangay:string,
  town:string,
  province:string,
  country:string,
  ccontact:number,
  cemaill:string,
  csize:number,
  cprocessingtime:string,
  cprocessingtime2:number,
  cbenefits:string,
  cdetails:string,

  //profile
  profileimg: string,
  fname:string,
  mname:string,
  lname:string,
  contact:number,
  email:string,

  
}


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private firestore: Firestore,
    private auth: Auth,
  ) { }

  getcompany(): Observable<Company[]>{
    const userget = this.auth.currentUser.uid;
    console.log(userget);
  
    const cakesRef = doc(this.firestore, `employers/${userget}/company/${userget}`)
    return docData(cakesRef, {idField: 'userget'}) as Observable<[Company]>
  }

  getemployer(): Observable<Company[]>{
    const userget = this.auth.currentUser.uid;
    console.log(userget);
  
    const cakesRef = doc(this.firestore, `employers/${userget}/profile/${userget}`)
    return docData(cakesRef, {idField: 'userget'}) as Observable<[Company]>
  }


  async editemployer({fname, mname, lname, contact}: 
    {fname: any, mname: any, lname: any, contact: any,}){

    try {
      const userget = this.auth.currentUser?.uid;
      const userDocRef3 = doc(this.firestore, `employers/${userget}/profile/${userget}`);
      const user = await updateDoc(userDocRef3, {fname, mname, lname, contact});
     
      return true;
    } catch (e) {
      return null;
    }
  }



  async editcompany({cname, ccontact, cemail, csize, cprocessingtime1, cprocessingtime2, cbenefits, street, barangay, town, province, country, cdetails}: 
    {cname: any, ccontact: any, cemail: any, csize: any,  cprocessingtime1: any,  cprocessingtime2: any,  cbenefits: any,  street: any,  barangay: any,  town: any,  province: any,  country: any,  cdetails: any,}){

    try {
      const userget = this.auth.currentUser?.uid;
      const userDocRef3 = doc(this.firestore, `employers/${userget}/company/${userget}`);
      const user = await updateDoc(userDocRef3, {cname, ccontact, cemail, csize, cprocessingtime1, cprocessingtime2, cbenefits, street, barangay, town, province, country, cdetails});
     
      return true;
    } catch (e) {
      return null;
    }
  }

  async editprofiledp(imageUrl: any){

    try {
      const userget = this.auth.currentUser?.uid;
      const userDocRef3 = doc(this.firestore, `employers/${userget}/profile/${userget}`);
      const user = await updateDoc(userDocRef3, {imageUrl});
     
      return true;
    } catch (e) {
      return null;
    }
  }



  // async addjoblisting({jtitle, jsalary, jspecialization, jtype, cname, caddress, ccontact, cemail, cdetails, csize, cprocessingtime, cbenefits}: 
  //   {jtitle: any, jsalary: any, jspecialization: any, jtype: any,  cname: any,  caddress: any,  ccontact: any,  cemail: any,  cdetails: any,  csize: any,  cprocessingtime: any, cbenefits: any,}){

  //   try {
  //     const userget = this.auth.currentUser?.uid;
  //     const userDocRef3 = doc(this.firestore, `joblisting/${userget}/jobdetails/${userget}`);
  //     await setDoc(userDocRef3, {uid: userget, jtitle, jsalary, jspecialization, jtype});
     
  //     const userDocRef4 = doc(this.firestore, `joblisting/${userget}/companydetails/${userget}`);
  //     await setDoc(userDocRef4, {uid: userget, cname, caddress, ccontact, cemail, cdetails, csize, cprocessingtime, cbenefits});
  //     return true;
  //   } catch (e) {
  //     return null;
  //   }
  // }


  async addjoblisting({cname, caddress, ccontact, cemail, cdetails, csize, cprocessingtime, cbenefits, jtitle, jsalary, jspecialization, jtype}: 
    {cname: any, caddress: any, ccontact: any, cemail: any, cdetails: any, csize: any, cprocessingtime: any, cbenefits: any, jtitle: any, jsalary: any, jspecialization: any, jtype: any, } ){

    try {
      
      const userget = this.auth.currentUser?.uid;
      const userDocRef3 = collection(this.firestore, `joblist/`);
      const user = await addDoc(userDocRef3, {cname, caddress, ccontact, cemail, cdetails, csize, cprocessingtime, cbenefits, jtitle, jsalary, jspecialization, jtype});
     
      return user;
    } catch (e) {
      return null;
    }
  }

  getjob(): Observable<Company[]>{
    const cakesRef = collection(this.firestore, 'joblist')
    return collectionData(cakesRef, {idField: 'id'}) as Observable<[Company]>
  }

}
