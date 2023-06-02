import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc, collection, addDoc, collectionData, deleteDoc, where } from '@angular/fire/firestore';
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

export interface User{
  //id is optional and not required
  //profile
  id?: string,
  profileimg: string,
  specialization: string,
  age: number,
  bday: string,
  cs: string,
  contact: number, 
  citizenship: string,
  email: string,
  fname: string,
  gender: string,
  lname: string,
  mname: string,
  suffix: string,
  aboutme: string,

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
  

  //addressadd
  clat: string;
  clng: string;
  currentPlaceID: string;
  currentaddress: string;
  homePlaceID: string;
  homeaddress: string;
  lat: string;
  lng: string;
  ea: number



  
}


@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  inboxid: any = [];
  profiledata: any = [];
  data: any=[];

  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private profile: ProfilingService
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


  async addjoblisting({jdescription, jtitle, jsalary, lat, lng,jposition, jtype, jexperience, attainment}: 
    { jtitle: any, jsalary: any, jposition: any,lat:any, lng: any, jtype: any, jdescription: any, jexperience: any, attainment: any } ){

    try {


    const timeStamp = Date.now();
    const date: Date = new Date(timeStamp);

    const date2 = date.toLocaleString();
      const userget = this.auth.currentUser?.uid;
 
      const userDocRef3 = collection(this.firestore, `joblist/`);
      const user = await addDoc(userDocRef3, {uid: userget, jtitle,lat,lng, jsalary, jposition, jtype, jdescription, timestamp: date2, listid: "",state: true, attainment, jexperience, timesort: timeStamp, distance: "", distancesort: 0,exception: [] });

      const id = user.id;

      const userDocRef4 = doc(this.firestore, `joblist/${id}`);
      const user2 = await updateDoc(userDocRef4, {listid: id });

      // const userDocRef5 = collection(this.firestore, `joblist/${id}/exceptions/`);
      // const user3 = await addDoc(userDocRef5, {userid: "initial"});
      


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





  getjobc(): Observable<Company[]>{
    const userget = this.auth.currentUser.uid;
  
    const cakesRef = collection(this.firestore, `joblist/`)
    const q = query(cakesRef, where("uid", "==", `${userget}` ))
    return collectionData(q, {idField: 'userget'}) as Observable<[Company]>
  }

  getjobs(spec: any, ea: any): Observable<Company[]>{
    console.log(spec);
    console.log(ea);
  const uid = this.auth.currentUser.uid;
  console.log(uid);
    const cakesRef = collection(this.firestore, 'joblist')
    const q = query(cakesRef, where("state", "==", true), where("jposition", "array-contains-any", spec), where("attainment", "<=", ea));
    return collectionData(q, {idField: 'userget'}) as Observable<[Company]> 

    
  }

  
  async editstatus(state: any, value: boolean){

    try {
      const userget = this.auth.currentUser?.uid;
      const userDocRef3 = collection(this.firestore, `joblist/${state}`);
      const user = await addDoc(userDocRef3, {state: value});
     
      return true;
    } catch (e) {
      return null;
    }
  }

  getjobe(id: any): Observable<Company[]>{
    const cakesRef = doc(this.firestore, `joblist/${id}`)
    // const q = query(cakesRef, where("listid", "==", id ))
    return docData(cakesRef, {idField: 'id'}) as Observable<[Company]> 
  }

  async editjoblisting({jtitle, jsalary, jtype, jdescription, jexperience, attainment, jposition}: 
    {jtitle: any, jsalary: any, jtype: any, jdescription:any, jexperience, attainment: any, jposition: any}, id: any){

    try {
      const userDocRef3 = doc(this.firestore, `joblist/${id}`);
      const user = await updateDoc(userDocRef3, {jtitle, jsalary, jtype, jdescription, jexperience, attainment, jposition,});
     
      return true;
    } catch (e) {
      return null;
    }
  }

  getcompanyid(id: any): Observable<Company[]>{

    const cakesRef = doc(this.firestore, `employers/${id}/company/${id}`)
    return docData(cakesRef, {idField: 'userget'}) as Observable<[Company]>
  }

  getprofilebyid(id: any): Observable<User[]>{
  
    const cakesRef = doc(this.firestore, `users/${id}/profile/${id}/`)
    return docData(cakesRef, {idField: 'id'}) as Observable<[User]>
  }

  getinboxid(cid: any): Observable<Company[]>{
    const uid = this.auth.currentUser.uid;
    const cakesRef = collection(this.firestore, `inbox/`)
    const q = query(cakesRef, where("cid", "==", cid ), where("uid", "==", uid ) )
    return collectionData(q, {idField: 'userget'}) as Observable<[Company]>
  }

  getinboxidc(cid: any): Observable<Company[]>{
    const uid = this.auth.currentUser.uid;
    const cakesRef = collection(this.firestore, `inbox/`)
    const q = query(cakesRef, where("uid", "==", cid ), where("cid", "==", uid ) )
    return collectionData(q, {idField: 'userget'}) as Observable<[Company]>
  }

  getinbox(): Observable<Company[]>{
    const uid = this.auth.currentUser.uid;
    const cakesRef = collection(this.firestore, `inbox/`)
    const q = query(cakesRef, where("uid", "==", uid ) )
    return collectionData(q, {idField: 'userget'}) as Observable<[Company]>
  }

  getinboxc(): Observable<Company[]>{
    const uid = this.auth.currentUser.uid;
    const cakesRef = collection(this.firestore, `inbox/`)
    const q = query(cakesRef, where("cid", "==", uid ) )
    return collectionData(q, {idField: 'userget'}) as Observable<[Company]>
  }

  

  async sendmessageclient(message, cid, cname, cimage){

    const timeStamp = Date.now();
    const date: Date = new Date(timeStamp);

    const date2 = date.toLocaleString();

    try {
      this.getinboxid(cid).pipe(first()).subscribe(async res=>{
        this.inboxid = res;
        console.log(this.inboxid);
    
        if (res.length == 0){

          this.profile.getprofile().pipe(first()).subscribe(async res=>{
            this.profiledata = res;

            const userget = this.auth.currentUser?.uid;
            const fname = this.profiledata.fname;
            const lname = this.profiledata.lname;
            const profileimg = this.profiledata.profileimg


            const userDocRef3 = collection(this.firestore, `inbox/`);
            const user = await addDoc(userDocRef3, {cid, uid: userget,cname,fname, lname, cimage, profileimg});
      
            const userDocRef4 = collection(this.firestore, `messages/`);
            const user2 = await addDoc(userDocRef4, {cid,userget,message, timeStamp, date2, inboxid: user.id, type: "client" });
  


          });

         
        }else{
          const userget = this.auth.currentUser?.uid;

          const userDocRef4 = collection(this.firestore, `messages/`);
          const user2 = await addDoc(userDocRef4, {cid,userget,message, timeStamp, date2, inboxid: this.inboxid[0].userget, type: "client" });

        }

      });
     
      return true;
    } catch (e) {
      return null;
    }
  }

  async sendmessagecompany(message, cid, cname, cimage){

    const timeStamp = Date.now();
    const date: Date = new Date(timeStamp);

    const date2 = date.toLocaleString();

    try {
      
      const userget = this.auth.currentUser?.uid;

      this.getinboxidc(cid).pipe(first()).subscribe(async res=>{
        this.inboxid = res;
        console.log(this.inboxid);
    
        if (res.length == 0){
          

          this.profile.getprofilebyid(cid).pipe(first()).subscribe(async res=>{
            this.profiledata = res;
            console.log(this.profiledata)

            const userget = this.auth.currentUser?.uid;
            const fname = this.profiledata.fname;
            const lname = this.profiledata.lname;
            const profileimg = this.profiledata.profileimg


            const userDocRef3 = collection(this.firestore, `inbox/`);
            const user = await addDoc(userDocRef3, {cid, uid: userget,cname,fname, lname, cimage, profileimg});
      
            const userDocRef4 = collection(this.firestore, `messages/`);
            const user2 = await addDoc(userDocRef4, {cid: userget, userget: cid ,message, timeStamp, date2, inboxid: user.id, type: "company" });
  


          });

         
        }else{
          const userget = this.auth.currentUser?.uid;

          const userDocRef4 = collection(this.firestore, `messages/`);
          const user2 = await addDoc(userDocRef4, {cid: userget,userget: cid,message, timeStamp, date2, inboxid: this.inboxid[0].userget, type: "company" });

        }

      });
     
      return true;
    } catch (e) {
      return null;
    }
  }

  async deletemessage(inboxid){

    console.log(inboxid);

    try {
      
      const userget = this.auth.currentUser?.uid;

    
      const userDocRef3 = doc(this.firestore, `inbox/${inboxid}`);
      const user = await deleteDoc(userDocRef3);
      
      const userDocRef4 = collection(this.firestore, `messages/`);
      const q = query(userDocRef4, where("inboxid", "==", inboxid ) )
      const result =  collectionData(q, {idField: 'userget'}) as Observable<[Company]>

      result.pipe(first()).subscribe(async res=>{
        this.data = res;
        for (let v=0; v<res.length;v++){
          const userDocRef3 = doc(this.firestore, `messages/${this.data[v].userget}`);
          await deleteDoc(userDocRef3);
        }
      });



     
      return true;
    } catch (e) {
      return null;
    }
  }

  getmessages(cid: any): Observable<Company[]>{
    const uid = this.auth.currentUser.uid;
    const cakesRef = collection(this.firestore, `messages/`)
    const q = query(cakesRef, where("inboxid", "==", cid ) )
    return collectionData(q, {idField: 'userget'}) as Observable<[Company]>
  }


}
