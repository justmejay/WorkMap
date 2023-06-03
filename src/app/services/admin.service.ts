import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc, addDoc, collectionData, deleteDoc, where, collection } from '@angular/fire/firestore';
import { Observable, first } from 'rxjs';
import { AuthService } from './auth.service';
import { collectionGroup, CollectionReference, query, Query, queryEqual, updateDoc, WhereFilterOp } from 'firebase/firestore';
import { timeEnd, timeStamp } from 'console';
import { ProfilingService } from './profiling.service';

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
  citizenship: string,
  contact:number,
  email:string,

  //joblist
  jtitle: string,
  jsalary: number,
  jtype: string,
  jdescription: string,
  jexperience: string,
  attainment: string,
  jposition: any,


  
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private profile: ProfilingService
  ) { }


  getallcompany(): Observable<Company[]>{
    const cakesRef = collectionGroup(this.firestore, `company`)
    // const q = query(cakesRef, where("schoolname", "!=", "" ))
    return collectionData(cakesRef, {idField: 'userget'}) as Observable<[Company]> 
  }

  getcompany(id: any): Observable<Company[]>{
  
    const cakesRef = doc(this.firestore, `employers/${id}/company/${id}`)
    return docData(cakesRef, {idField: 'id'}) as Observable<[Company]>
  }

  getemployer(id: any): Observable<Company[]>{
  
    const cakesRef = doc(this.firestore, `employers/${id}/profile/${id}`)
    return docData(cakesRef, {idField: 'id'}) as Observable<[Company]>
  }

  getaccepted(id:any){

    const cakeRef = doc(this.firestore, `employers/${id}/company/${id}`)
    const comp = "Accepted"
    return updateDoc (cakeRef, {status: comp } )
  }

  getdeclined(id:any){

    const cakeRef = doc(this.firestore, `employers/${id}/company/${id}`)
    const comp = "Declined"
    return updateDoc (cakeRef, {status: comp } )
  }

  getallusers(): Observable<Company[]>{
    const cakesRef = collectionGroup(this.firestore, `name`)
    return collectionData(cakesRef, {idField: 'userget'}) as Observable<[Company]> 
  }

  getprofile(id: any): Observable<Company[]>{
  
    const cakesRef = doc(this.firestore, `users/${id}/profile/${id}`)
    return docData(cakesRef, {idField: 'id'}) as Observable<[Company]>
  }

  getaddress(id: any): Observable<Company[]>{
  
    const cakesRef = doc(this.firestore, `users/${id}/address/${id}`)
    return docData(cakesRef, {idField: 'id'}) as Observable<[Company]>
  }

  getallemployers(): Observable<Company[]>{
    const cakesRef = collectionGroup(this.firestore, `namee`)
    return collectionData(cakesRef, {idField: 'userget'}) as Observable<[Company]> 
  }

  deleteemployers(id: any){
    const cakeRef = doc(this.firestore, `employers/${id}`)
    return deleteDoc(cakeRef)
  }

  deleteusers(id: any){
    const cakeRef = doc(this.firestore, `users/${id}`)
    return deleteDoc(cakeRef)
  }
}
