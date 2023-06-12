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
  certs: any = [];

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

    
    const timeStamp = Date.now();
    const date: Date = new Date(timeStamp);

    const date2 = date.toLocaleString();

    const applicationRefx = collection(this.firestore, `notifications/`)
    const passx =  addDoc (applicationRefx, {timeStamp, time: date2, notiftype: "adminaccept", uid: id})

    const cakeRef = doc(this.firestore, `employers/${id}/company/${id}`)
    const comp = "Accepted"

    const up = updateDoc (cakeRef, {status: comp })

    const cakeRef2 = doc(this.firestore, `employers/${id}/profile/${id}`)

    const comp2 = "Accepted"

    const up2 = updateDoc (cakeRef2, {status: comp2} )


    
  }

  getarchived(id:any){

    
    const timeStamp = Date.now();
    const date: Date = new Date(timeStamp);

    const date2 = date.toLocaleString();

    const applicationRefx = collection(this.firestore, `notifications/`)
    const passx =  addDoc (applicationRefx, {timeStamp, time: date2, notiftype: "adminarchive", uid: id})

    const cakeRef = doc(this.firestore, `employers/${id}/company/${id}`)
    const comp = "Archived"

    const up = updateDoc (cakeRef, {status: comp })

    const cakeRef2 = doc(this.firestore, `employers/${id}/profile/${id}`)

    const comp2 = "Archived"

    const up2 = updateDoc (cakeRef2, {status: comp })

  }


  getreactivated(id:any){

    
    const timeStamp = Date.now();
    const date: Date = new Date(timeStamp);

    const date2 = date.toLocaleString();

    const applicationRefx = collection(this.firestore, `notifications/`)
    const passx =  addDoc (applicationRefx, {timeStamp, time: date2, notiftype: "adminreactivate", uid: id})

    const cakeRef = doc(this.firestore, `employers/${id}/company/${id}`)
    const comp = "Reactivated"

    const up = updateDoc (cakeRef, {status: comp })

    const cakeRef2 = doc(this.firestore, `employers/${id}/profile/${id}`)

    const comp2 = "Reactivated"

    const up2 = updateDoc (cakeRef2, {status: comp2} )


    
  }


  getdeclined(id:any, reasonr: any){

    // const timeStamp = Date.now();
    // const date: Date = new Date(timeStamp);

    // const date2 = date.toLocaleString();

    // const applicationRefx = doc(this.firestore, `notifications/${id}`)
    // const passx =  setDoc (applicationRefx, {timeStamp, time: date2, reason: reasonr, status: "Declined"})

    const cakeRef = doc(this.firestore, `employers/${id}/company/${id}`)
    const comp = "Declined"

    const up = updateDoc (cakeRef, {status: comp })

    const cakeRef2 = doc(this.firestore, `employers/${id}/profile/${id}`)

    const comp2 = "Declined"

    const up2 = updateDoc (cakeRef2, {status: comp2} )
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
    const cakesRef = collection(this.firestore, `employers/`)
    return collectionData(cakesRef, {idField: 'userget'}) as Observable<[Company]> 
  }

  getallemployersd(id): Observable<Company[]>{
    console.log(id)
    const cakesRef = doc(this.firestore, `employers/${id}/profile/${id}`)
    return docData(cakesRef, {idField: 'userget'}) as Observable<[Company]> 
  }


  deleteemployers(id: any, email){
    const profile = collection(this.firestore, `employers/${id}/profile`);
    const profiledata =  collectionData(profile, {idField: 'userget'}) as Observable<[Company]> 

    profiledata.subscribe(res=>{
      
      this.certs = res;

      for (let v = 0;v<res.length;v++){
        const address = doc(this.firestore, `employers/${id}/profile/${this.certs[v].userget}`);
        deleteDoc(address);
      }
    });

    const company = collection(this.firestore, `employers/${id}/company`);
    const companydata =  collectionData(company, {idField: 'userget'}) as Observable<[Company]> 

    profiledata.subscribe(res=>{
      
      this.certs = res;

      for (let v = 0;v<res.length;v++){
        const address = doc(this.firestore, `employers/${id}/company/${this.certs[v].userget}`);
        deleteDoc(address);
      }
    });






    const cakeRef = doc(this.firestore, `employers/${id}`);
    const cakeRef2 = collection(this.firestore, `employerdeletion`);
    addDoc (cakeRef2, {email})
    return deleteDoc(cakeRef)



  }

  deleteusers(id: any, email){
    console.log(id);
    const address = doc(this.firestore, `users/${id}/address/${id}`);
    const name = doc(this.firestore, `users/${id}/name/${id}`);
    const preferred = doc(this.firestore, `users/${id}/preferred/${id}`);
    const profile = doc(this.firestore, `users/${id}/profile/${id}`);
    const resume = doc(this.firestore, `users/${id}/resume/${id}`);
   deleteDoc(address);
   deleteDoc(name);
   deleteDoc(preferred);
   deleteDoc(profile);
   deleteDoc(resume);

    const cert = collection(this.firestore, `users/${id}/certification`);
    const certdata =  collectionData(cert, {idField: 'userget'}) as Observable<[Company]> 

    certdata.subscribe(res=>{
      
      this.certs = res;

      for (let v = 0;v<res.length;v++){
        const address = doc(this.firestore, `users/${id}/certifications/${this.certs[v].userget}`);
        deleteDoc(address);
      }


    });


    const exp = collection(this.firestore, `users/${id}/experience/`);
    const expdata =  collectionData(exp, {idField: 'userget'}) as Observable<[Company]> 

    expdata.subscribe(res=>{
      
      this.certs = res;

      for (let v = 0;v<res.length;v++){
        const address = doc(this.firestore, `users/${id}/experience/${this.certs[v].userget}`);
        deleteDoc(address);
      }


    });
    const school = collection(this.firestore, `users/${id}/school/`);

    const schooldata =  collectionData(school, {idField: 'userget'}) as Observable<[Company]> 

    schooldata.subscribe(res=>{
      
      this.certs = res;

      for (let v = 0;v<res.length;v++){
        const address = doc(this.firestore, `users/${id}/school/${this.certs[v].userget}`);
        deleteDoc(address);
      }


    });

    const cakeRef = doc(this.firestore, `users/${id}`);
    const cakeRef2 = collection(this.firestore, `userdeletion`);
    addDoc (cakeRef2, {email});
    return deleteDoc(cakeRef);
      
  }

  // getnotif(): Observable<Company[]>{
  //   const uid = this.auth.currentUser.uid ;
  //    console.log(uid);
  //   const cakesRef = collection(this.firestore, `notifications`);
  //   const q = query(cakesRef, where("company.uid", "==",uid ))
  //   return collectionData(q, {idField: 'id'}) as Observable<[Company]>
  // }

  getcomapp(id: any): Observable<Company[]>{
    const cakesRef = collection(this.firestore, `application`)
    const q = query(cakesRef, where("application.cid", "==", id ), where('status', 'in', ['Pending', 'Inprocess']))
    return collectionData(q, {idField: 'userget'}) as Observable<[Company]> 
  }
}
