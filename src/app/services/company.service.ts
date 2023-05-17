import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc, collection, addDoc, collectionData, deleteDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { collectionGroup, CollectionReference, query, Query, queryEqual, updateDoc, WhereFilterOp } from 'firebase/firestore';
import { timeStamp } from 'console';

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
  citizenship,
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
  ) {

 
    // const date: Date = new Date(1682515211967);

 
   }


  getcompany(): Observable<Company[]>{
    const userget = this.auth.currentUser.uid;
 
  
    const cakesRef = doc(this.firestore, `employers/${userget}/company/${userget}`)
    return docData(cakesRef, {idField: 'userget'}) as Observable<[Company]>
  }

  getemployer(): Observable<Company[]>{
    const userget = this.auth.currentUser.uid;
 
  
    const cakesRef = doc(this.firestore, `employers/${userget}/profile/${userget}`)
    return docData(cakesRef, {idField: 'userget'}) as Observable<[Company]>
  }


  async editemployer({fname, mname, lname, citizenship, contact}: 
    {fname: any, mname: any, lname: any, citizenship:any, contact: any,}){

    try {
      const userget = this.auth.currentUser?.uid;
      const userDocRef3 = doc(this.firestore, `employers/${userget}/profile/${userget}`);
      const user = await updateDoc(userDocRef3, {fname, mname, lname, citizenship, contact});
     
      return true;
    } catch (e) {
      return null;
    }
  }



  async editcompany({cname, ccontact, cemail, csize,cdetails,newmarker, cprocessingtime1, cprocessingtime2, cbenefits,  companyaddress}: 
    {cname: any, ccontact: any, cemail: any, csize: any, newmarker:any, cprocessingtime1: any,  cprocessingtime2: any,  cbenefits: any,  companyaddress: any,  cdetails: any,}){

    try {
      const userget = this.auth.currentUser?.uid;
      const userDocRef3 = doc(this.firestore, `employers/${userget}/company/${userget}`);
      const user = await updateDoc(userDocRef3, {cname, ccontact, cemail, csize, cprocessingtime1, cprocessingtime2, cbenefits, companyaddress, cdetails, lat: newmarker.lat, lng: newmarker.lng});
     
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



  async editcompanylogo(imageurl: any){

    try {
      const userget = this.auth.currentUser?.uid;
      const userDocRef3 = doc(this.firestore, `employers/${userget}/company/${userget}`);
      const user = await updateDoc(userDocRef3, {imageurl});
     
      return true;
    } catch (e) {
 
      return null;
    }
  }


  async addjoblisting({jdescription, jtitle, jsalary, jposition, jtype, jexperience, attainment}: 
    { jtitle: any, jsalary: any, jposition: any, jtype: any, jdescription: any, jexperience: any, attainment: any } ){

    try {


    const timeStamp = Date.now();
    const date: Date = new Date(timeStamp);

    const date2 = date.toLocaleString();
      const userget = this.auth.currentUser?.uid;
 
      const userDocRef3 = collection(this.firestore, `joblist/`);
      const user = await addDoc(userDocRef3, {uid: userget, jtitle, jsalary, jposition, jtype, jdescription, timestamp: date2, listid: "",state: true });

      const id = user.id;

      const userDocRef4 = doc(this.firestore, `joblist/${id}`);
      const user2 = await updateDoc(userDocRef4, {listid: id });
      


      return user;
    } catch (e) {
      return null;
    }
  }

  getjob(): Observable<Company[]>{
    const cakesRef = collection(this.firestore, 'joblist')
    const q = query(cakesRef, where("schoolname", "!=", "" ))
    return collectionData(cakesRef, {idField: 'userget'}) as Observable<[Company]> 
  }

  getjobs(spec: any): Observable<Company[]>{
    const cakesRef = collection(this.firestore, 'joblist')
    const q = query(cakesRef, where("state", "==", true ), where("jspecialization", "==", spec ))
    return collectionData(q, {idField: 'userget'}) as Observable<[Company]> 
  }



  getjobc(): Observable<Company[]>{
    const userget = this.auth.currentUser.uid;
  
    const cakesRef = collection(this.firestore, `joblist/`)
    const q = query(cakesRef, where("uid", "==", `${userget}` ))
    return collectionData(q, {idField: 'userget'}) as Observable<[Company]>
  }

  
  async editstatus(state: any, value: boolean){

    try {
      const userget = this.auth.currentUser?.uid;
      const userDocRef3 = doc(this.firestore, `joblist/${state}`);
      const user = await updateDoc(userDocRef3, {state: value});
     
      return true;
    } catch (e) {
      return null;
    }
  }

}
