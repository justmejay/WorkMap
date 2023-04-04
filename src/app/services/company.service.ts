import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc, collection, addDoc, collectionData, deleteDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface Company{
  //id is optional and not required
  //company
  id?: string,
  cname:string,
  cstreet:string,
  cbarangay:string,
  ctown:string,
  cprovince:string,
  ccountry:string,
  ccontact:number,
  cemaill:string,
  csize:number,
  caverage:string,
  cbenefits:string,
  caddinfo:string,

  //profile
  ename:string,
  econtact:number,
  eemail:string,

  
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
}
