import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc, collection, addDoc, collectionData, deleteDoc, where } from '@angular/fire/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  Storage,
  uploadString,
} from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';
import { collectionGroup, CollectionReference, query, Query, queryEqual, updateDoc, WhereFilterOp } from 'firebase/firestore';
import { Observable, first } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpUserEvent } from '@angular/common/http';
import { AnyARecord } from 'dns';
import { idTokenResult } from '@angular/fire/auth-guard';

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
  aboutme: string,
  exception: any,
  

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
  

  //addressadd
  clat: string;
  clng: string;
  currentPlaceID: string;
  currentaddress: string;
  homePlaceID: string;
  homeaddress: string;
  lat: string;
  lng: string;

  job:any;

  status: string;
  reason: string;
  
}


export interface Application{
  cid: any;
  //id is optional and not required
  id?: string,
  profiledetails: any,
  addressdetails: any,
  resumedetails: any,
  certificationsdetails: any,
  schooldetails: any,
  experiencedetails: any,

  job:any;
  jobid: any;
  uid: any;
  exception: any;
}


@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  jobslots: any = [];

  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private storage: Storage,
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
  
    const cakesRef = collection(this.firestore, `users/${id}/certifications`)
    const q = query(cakesRef, where("name", "!=", "" ))
        return collectionData(q, {idField: 'id'}) as Observable<[User]>
  }

  getschool(): Observable<User[]>{
    const id = this.auth.currentUser.uid;
  
    const cakesRef = collection(this.firestore, `users/${id}/school`)
    const q = query(cakesRef, where("schoolname", "!=", "" ))
    return collectionData(q, {idField: 'id'}) as Observable<[User]>
  }

  getresume(): Observable<User[]>{
    const id = this.auth.currentUser.uid;
  
    const cakesRef = doc(this.firestore, `users/${id}/resume/${id}`)
    return docData(cakesRef, {idField: 'id'}) as Observable<[User]>
  }

  getexperience(): Observable<User[]>{
    const id = this.auth.currentUser.uid;
  
    const cakesRef = collection(this.firestore, `users/${id}/experience`)
    const q = query(cakesRef, where("cname", "!=", "" ))
    return collectionData(q, {idField: 'id'}) as Observable<[User]>
  }

  getuser(): Observable<User[]>{
    const id = this.auth.currentUser.uid;
  
    const cakesRef = collection(this.firestore, `users/${id}/experience`)
    const q = query(cakesRef, where("cname", "!=", "" ))
    return collectionData(q, {idField: 'id'}) as Observable<[User]>
  }

  getjoblist(id: any): Observable<User[]>{
  
    try{
      const cakesRefe = doc(this.firestore, `joblist/${id}`)
      return docData(cakesRefe, {idField: 'id'}) as Observable<User[]>

    }catch(e){
      console.log(e);
      return null;
    }

    
   

  }

  getjoblistall(): Observable<User[]>{
  
    try{
      const cakesRefe = collection(this.firestore, `joblist`)
      return collectionData(cakesRefe, {idField: 'id'}) as Observable<User[]>

    }catch(e){
      console.log(e);
      return null;
    }
  }

 
  async addApplication(application:Application, list: any){
    console.log(list);
    console.log(application);
    console.log(this.auth.currentUser.uid);

    const timeStamp = Date.now();
    const date: Date = new Date(timeStamp);

    const date2 = date.toLocaleString();
    const applicationRef = collection(this.firestore, `application`)
    const pass = await addDoc (applicationRef, {application, timeStamp, time: date2, reason: "", status: "Pending"});


     const applicationRef1 = doc(this.firestore, `joblist/${application.jobid}`)
      const pass1 =  updateDoc (applicationRef1, {exception: list});

    const applicationRefx = collection(this.firestore, `notifications/`)
    const passx =  addDoc (applicationRefx, { timeStamp, time: date2, notifype: "application", applyid: pass.id, uid: application.cid})






    return pass;

  }

  
  getapplicants(id: any): Observable<User[]>{
    const cakesRef = collection(this.firestore, 'application/')
    const q = query(cakesRef, where("application.jobid", "==", id ))
    return collectionData(q, {idField: 'id'}) as Observable<[User]> 
  }

  getapplication(id: any): Observable<User[]>{
    console.log(id);
    const cakesRef = doc(this.firestore, `application/${id}`)
    return docData(cakesRef, {idField: 'id'}) as Observable<[User]> 
  }


  getjtitle(id: any): Observable<User[]>{
    const cakesRef = collection(this.firestore, 'joblist/')
    const q = query(cakesRef, where("listid", "==", id ))
    return collectionData(q, {idField: 'id'}) as Observable<[User]> 
  }

  getprofiles(id:any): Observable<User[]>{
    const cakesRef = doc(this.firestore, `users/${id}/profile/${id}/`)
    return docData(cakesRef, {idField: 'id'}) as Observable<[User]>
  }

  getaddresss(id: any): Observable<User[]>{
    const cakesRef = doc(this.firestore, `users/${id}/address/${id}`)
    return docData(cakesRef, {idField: 'id'}) as Observable<[User]>
  }

  getresumes(id: any): Observable<User[]>{
    const cakesRef = doc(this.firestore, `users/${id}/resume/${id}`)
    return docData(cakesRef, {idField: 'id'}) as Observable<[User]>
  }

  getschools(id: any): Observable<User[]>{
    const cakesRef = collection(this.firestore, `users/${id}/school`)
    const q = query(cakesRef, where("schoolname", "!=", "" ))
    return collectionData(q, {idField: 'id'}) as Observable<[User]>
  }

  getexperiences(id: any): Observable<User[]>{
    const cakesRef = collection(this.firestore, `users/${id}/experience`)
    const q = query(cakesRef, where("cname", "!=", "" ))
    return collectionData(q, {idField: 'id'}) as Observable<[User]>
  }

  getcertifications(id: any): Observable<User[]>{
    const cakesRef = collection(this.firestore, `users/${id}/certifications`)
    const q = query(cakesRef, where("name", "!=", "" ))
    return collectionData(q, {idField: 'id'}) as Observable<[User]>
  }


  getcompanydata(id: any): Observable<User[]>{
    const cakesRef = doc(this.firestore, `employers/${id}/company/${id}`)
    return docData(cakesRef, {idField: 'id'}) as Observable<[User]>
  }

  getnotif(): Observable<User[]>{
    const uid = this.auth.currentUser.uid ;
     console.log(uid);
    const cakesRef = collection(this.firestore, `notifications`);
    const q = query(cakesRef, where("uid", "==",uid ))
    return collectionData(q, {idField: 'id'}) as Observable<[User]>
  }
  getnotifu(): Observable<User[]>{
    const uid = this.auth.currentUser.uid ;
     console.log(uid);
    const cakesRef = collection(this.firestore, `notificationuser`);
    const q = query(cakesRef, where("uid", "==",uid ))
    return collectionData(q, {idField: 'id'}) as Observable<[User]>
  }


  getaccepted(id:any, data: any){


    const timeStamp = Date.now();
    const date: Date = new Date(timeStamp);

    const date2 = date.toLocaleString();

    console.log(data)

    this.getjoblist(data.application.jobid).pipe(first()).subscribe(res=>{

      this.jobslots = res;
      const cslots = this.jobslots.slots;
      console.log(this.jobslots)
      console.log(cslots)

      const cakeRef = doc(this.firestore, `joblist/${data.application.jobid}`)
      updateDoc (cakeRef, {slots: cslots - 1 } )

    });

    const cakeRef = doc(this.firestore, `application/${id}`)
    const comp = "Accepted"
     updateDoc (cakeRef, {status: comp } )


    const cakeRef2 = collection(this.firestore, `notificationuser/`)
    return addDoc (cakeRef2, {uid: data.application.uid,listid: data.id , date2, timeStamp, notiftype: "applicationaccept" } )
  
  }
  

  getreviewed(id:any, data: any){

    const timeStamp = Date.now();
    const date: Date = new Date(timeStamp);

    const date2 = date.toLocaleString();

    console.log(data)
    const cakeRef = doc(this.firestore, `application/${id}`)
    const comp = "Inprocess"
     updateDoc (cakeRef, {status: comp } )

    const cakeRef2 = collection(this.firestore, `notificationuser/`)
    return addDoc (cakeRef2, {uid: data.application.uid, listid: data.id , date2, timeStamp, notiftype: "applicationreview" } )
  }
  

  getrejected(id:any, reasonr: any, data: any){
    console.log(id)
    console.log(reasonr)
    console.log(data)


    const timeStamp = Date.now();
    const date: Date = new Date(timeStamp);

    const date2 = date.toLocaleString();

    const cakeRef = doc(this.firestore, `application/${id}`)
    const comp = "Rejected"
     updateDoc (cakeRef, {status: comp, reason: reasonr } )

     const cakeRef2 = collection(this.firestore, `notificationuser/`)
     return addDoc (cakeRef2, {uid: data.application.uid, listid: data.id , date2, timeStamp, notiftype: "applicationreject" } )
    }


  getqjoblist(jparray: any): Observable<User[]>{
    console.log(jparray);
  
    try{
      const cakesRefe = collection(this.firestore, `joblist`)
      const q = query(cakesRefe, where("jposition", "array-contains-any", jparray))
      return collectionData(q, {idField: 'id'}) as Observable<User[]>

    }catch(e){
      console.log(e);
      return null;
    }

   

  }

  
  getallapply(id: any): Observable<User[]>{
    const cakesRef = collection(this.firestore, 'application/')
    const q = query(cakesRef, where("application.cid", "==", id),  where("status", "==", "Accepted"))
    return collectionData(q, {idField: 'id'}) as Observable<[User]> 
  }

  getallprof(id: any): Observable<User[]>{
    const cakesRef = doc(this.firestore, `users/${id}/profile/${id}/`)
    return docData(cakesRef, {idField: 'id'}) as Observable<[User]>
  }


  rate(uid: any, comid: any, cs,wq,ts,pr,co){

    const timeStamp = Date.now();
    const date: Date = new Date(timeStamp);

    const date2 = date.toLocaleString();



    const cakeRef2 = collection(this.firestore, `rating/`)
    return addDoc (cakeRef2, {uid, comid, cs,wq,ts,pr,co} )
  }


  rate2(uid: any, comid: any, cs,wq,ts,pr,co,id){

    const timeStamp = Date.now();
    const date: Date = new Date(timeStamp);

    const date2 = date.toLocaleString();
    console.log(id);



    const cakeRef3 = doc(this.firestore, `rating/${id}`)
    return updateDoc (cakeRef3, {cs,wq,ts,pr,co} )
  }

  getrating(id: any, cid): Observable<User[]>{
    const cakesRef = collection(this.firestore, `rating`)
    const q = query(cakesRef, where("uid", "==",id ), where("comid", "==",cid ))
    return collectionData(q, {idField: 'id'}) as Observable<[User]>
  }



  getappid(): Observable<User[]>{
    
      const id = this.auth.currentUser.uid;
      
      const cakesRef = collection(this.firestore, 'application/')
      const q = query(cakesRef, where("application.uid", "==", id));
      return collectionData(q, {idField: 'userget'}) as Observable<[User]> 
  
      
    }

    getappbyid(id: any): Observable<User[]>{
    
      
      const cakesRef = doc(this.firestore, `application/${id}`);
      return docData(cakesRef, {idField: 'userget'}) as Observable<[User]> 
  
      
    }


    getjobid(id: any): Observable<User[]>{
      
      const cakesRef = doc(this.firestore, `joblist/${id}`)
      // const q = query(cakesRef, where("application.uid", "==", id));
      return docData(cakesRef, {idField: 'userget'}) as Observable<[User]> 
  
      
    }

    getcompanyid(id: any): Observable<User[]>{
      
      const cakesRef = doc(this.firestore, `employers/${id}/company/${id}`)
      // const q = query(cakesRef, where("application.uid", "==", id));
      return docData(cakesRef, {idField: 'userget'}) as Observable<[User]> 
  
      
    }

  

  


  


 
  
                       

}
