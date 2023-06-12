import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc, collection, addDoc, collectionData, deleteDoc, where, collectionSnapshots } from '@angular/fire/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  Storage,
  uploadString,
} from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';
import { collectionGroup, CollectionReference, query,getCountFromServer, Query, queryEqual, updateDoc, WhereFilterOp } from 'firebase/firestore';
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
export class ProfilingService {

  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private storage: Storage,
  ) {
    
   }


  
  getprofile(): Observable<User[]>{
    const id = this.auth.currentUser.uid;
  
    const cakesRef = doc(this.firestore, `users/${id}/profile/${id}/`)
    return docData(cakesRef, {idField: 'id'}) as Observable<[User]>
  }

  getprofilebyid(id: any): Observable<User[]>{
  
    const cakesRef = doc(this.firestore, `users/${id}/profile/${id}/`)
    return docData(cakesRef, {idField: 'id'}) as Observable<[User]>
  }


  getcoords(): Observable<User[]>{
    const id = this.auth.currentUser.uid;
  
    const cakesRef = doc(this.firestore, `users/${id}/address/${id}/`)
    return docData(cakesRef, {idField: 'id'}) as Observable<[User]>
  }
  getprofilepref(): Observable<User[]>{
    const id = this.auth.currentUser.uid;
  
    const cakesRef = doc(this.firestore, `users/${id}/preferred/${id}/`)
    return docData(cakesRef, {idField: 'id'}) as Observable<[User]>
  }


  getaddress(): Observable<User[]>{
    const id = this.auth.currentUser.uid;
  
    const cakesRef = doc(this.firestore, `users/${id}/address/${id}`)
    return docData(cakesRef, {idField: 'id'}) as Observable<[User]>
  }

  getpref(): Observable<User[]>{
    const id = this.auth.currentUser.uid;
  
    const cakesRef = doc(this.firestore, `users/${id}/preferred/${id}`)
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



  async addex({cname, caddress, jtitle, yoe, jposition }: 
    {cname: any, caddress: any, jtitle: any, yoe: any, jposition: any  } ){

    try {
      
      const userget = this.auth.currentUser?.uid;
      const userDocRef3 = collection(this.firestore, `users/${userget}/experience`);
      const user = await addDoc(userDocRef3, {cname, caddress, jtitle,yoe, jposition});
     
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

  async editex({cname, caddress, jtitle, jposition, yoe }: 
    {cname: any, caddress: any, jtitle: any, datet: any,jposition: any, yoe: any, datef: any }, experience: any ){

    try {
 
      const userget = this.auth.currentUser?.uid;
      const userDocRef3 = doc(this.firestore, `users/${userget}/experience/${experience}`);
      const user = await updateDoc(userDocRef3, {cname, caddress, jtitle, jposition, yoe});
     
      return true;
    } catch (e) {
      return null;
    }
  }

  async editprofile({fname, mname,sex, lname,ea, suffix, bday,contact, citizenship, age, cs, religion}: 
    {fname: any, mname: any, lname: any, suffix: any,ea: any, contact: any, citizenship:any, bday: any, cs: any, religion : any, age: any, sex: any}){

    try {
      const userget = this.auth.currentUser?.uid;

      const userDocRef4 = doc(this.firestore, `users/${userget}/name/${userget}`);
      const user1 = await updateDoc(userDocRef4, {fname, lname, mname, suffix, });
     
      const userDocRef3 = doc(this.firestore, `users/${userget}/profile/${userget}`);
      const user = await updateDoc(userDocRef3, {fname, cs, religion, lname, mname,suffix, bday, contact, citizenship, age , sex, ea});
     
      return true;
    } catch (e) {
      return null;
    }
  }

  async editaddress({homeaddress, newmarker, currentaddress}: 
    {homeaddress: any, newmarker: any, currentaddress: any}){

    try {
      const userget = this.auth.currentUser?.uid;
      const userDocRef3 = doc(this.firestore, `users/${userget}/address/${userget}`);
      const user = await updateDoc(userDocRef3, {changed: true, homeaddress, clat: newmarker.lat, clng: newmarker.lng, currentaddress});

      return true;
    } catch (e) {
      return null;
    }
  }

  async Ceditaddress({homeaddress}: 
    {homeaddress: any}){

    try {
      const userget = this.auth.currentUser?.uid;
      const userDocRef3 = doc(this.firestore, `users/${userget}/address/${userget}`);
      const user = await updateDoc(userDocRef3, {homeaddress});

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


  async editaboutme(aboutme: any){

    try {
      
      const userget = this.auth.currentUser?.uid;
      const userDocRef3 = doc(this.firestore, `users/${userget}/profile/${userget}`);
      const user = await updateDoc(userDocRef3, {aboutme});
     
      return true;
    } catch (e) {
      return null;
    }
  }


  async editref({mo, moc, fa, fac, mo1, moc1, fa1, fac1, mo2, moc2, fa2, fac2}: {mo: any, moc: any, fa: any, fac: any,mo1, moc1, fa1, fac1, mo2, moc2, fa2, fac2}){

    try {
      
      const userget = this.auth.currentUser?.uid;
      const userDocRef3 = doc(this.firestore, `users/${userget}/resume/${userget}`);
      const user = await updateDoc(userDocRef3, {mo, moc, fa, fac, mo1, moc1, fa1, fac1, mo2, moc2, fa2, fac2});
     
      return true;
    } catch (e) {
      return null;
    }
  }


  async addcert({name, orgn, year}: 
    { name: any, orgn: any, year: any} ){

    try {
      
      const userget = this.auth.currentUser?.uid;
      const userDocRef3 = collection(this.firestore, `users/${userget}/certifications`);
      const user = await addDoc(userDocRef3, {name, orgn, year, fpath: ""});
     
      return user;
    } catch (e) {
      return null;
    }
  }

  async editcertfile(fpath: any, id: any, filename: any){

    try {
      const userget = this.auth.currentUser?.uid;
      const userDocRef3 = doc(this.firestore, `users/${userget}/certifications/${id}`);
      const user = await updateDoc(userDocRef3, {fpath, filename});
     
      return true;
    } catch (e) {
      return null;
    }
  }

  getcertbyID(id:any):Observable<User>{
    const  uid =  this.auth.currentUser.uid;
    const cakesByIdRef = doc(this.firestore, `users/${uid}/certifications/${id}`)
    return docData(cakesByIdRef, {idField: 'id'}) as Observable <User>
  }

  async editcert({name, orgn, year}: 
    { name: any, orgn: any, year: any}, id: any ){

    try {
      
      const userget = this.auth.currentUser?.uid;
      const userDocRef3 = doc(this.firestore, `users/${userget}/certifications/${id}`);
      const user = await updateDoc(userDocRef3, {name, orgn, year});
     
      return user;
    } catch (e) {
      return null;
    }
  }

  async deletecertfile(id: any, fname: any){
    const userget = this.auth.currentUser?.uid;

    const fileStoragePath = `filesStorage/certifications/${this.auth.currentUser.uid}/${id}/${fname}`;
    const storageRef = ref(this.storage, fileStoragePath);
    await deleteObject(storageRef);
  }

  async editresumefile(fileUrl: any, generateunique: any){

    try {
      const userget = this.auth.currentUser?.uid;
      const userDocRef3 = doc(this.firestore, `users/${userget}/resume/${userget}`);
      const user = await updateDoc(userDocRef3, {fpath: fileUrl, filename: generateunique});
     
      return user;
    } catch (e) {
      return null;
    }
  }

  async deleterfile(fname: any){
    const userget = this.auth.currentUser?.uid;

    const fileStoragePath = `filesStorage/resume/${this.auth.currentUser.uid}/${fname}`;
    const storageRef = ref(this.storage, fileStoragePath);
    await deleteObject(storageRef);
  }

  deletecdoc(id: any){
    const userget = this.auth.currentUser.uid;
    const cakeRef = doc(this.firestore, `users/${userget}/certifications/${id}`)
    return deleteDoc(cakeRef)
  }

  deleteedoc(id: any){
    const userget = this.auth.currentUser.uid;
    const cakeRef = doc(this.firestore, `users/${userget}/experience/${id}`)
    return deleteDoc(cakeRef)
  }

  deletesdoc(id: any){
    const userget = this.auth.currentUser.uid;
    const cakeRef = doc(this.firestore, `users/${userget}/school/${id}`)
    return deleteDoc(cakeRef)
  }

  async addapplication({name, bday, age, homeaddress, currentaddress, cs, religion, specialization, mo, moc, fa, fac, schoolname, course, level, yearg, cname, caddress, jtitle, datef, datet, reason, cnname, orgn, year, fpath, fpathr}: 
    {name: any, bday: any, age: any, homeaddress: any, currentaddress: any, cs: any, religion: any, specialization: any, mo: any, moc: any, fa: any, fac: any, schoolname:any, course:any, level:any, yearg:any, cname:any, caddress:any, jtitle:any, datef:any, datet:any, reason:any, cnname:any, orgn:any, year:any, fpath:any, fpathr:any} ){

    try {
      
      const userget = this.auth.currentUser?.uid;
 
      const userDocRef3 = collection(this.firestore, `application/`);
      const user = await addDoc(userDocRef3, {uid: userget, name, bday, age, homeaddress, currentaddress, cs, religion, specialization, mo, moc, fa, fac, schoolname, course, level, yearg, cname, caddress, jtitle, datef, datet, reason, cnname, orgn, year, fpath, fpathr});
     
      return user;
    } catch (e) {
      return null;
    }
  }

  verify(): Observable<User[]>{

    const id = this.auth.currentUser.uid;
  
    const cakesRef = collection(this.firestore, `users/${id}/profile/`)
    return collectionData(cakesRef, {idField: 'id'}) as Observable<[User]>
    
  }
 
 
  verifyc(): Observable<User[]>{
    const id = this.auth.currentUser.uid;
  
    const cakesRef = collection(this.firestore, `employers/${id}/profile/`)
    return collectionData(cakesRef, {idField: 'id'}) as Observable<[User]>
    
  }


  async verifyexp(){
    const id = this.auth.currentUser.uid;
  
    const cakesRef = collection(this.firestore, `users/${id}/experience/`)
    const q = query(cakesRef, where("cname", "!=", "" ));
    const b = getCountFromServer(q);
    const c = (await b).data().count;   
 
    return c;

    
  }

  async verifyschool(){
    const id = this.auth.currentUser.uid;
  
    const cakesRef = collection(this.firestore, `users/${id}/school/`)
    const q = query(cakesRef, where("schoolname", "!=", "" ))
    const b = getCountFromServer(q);
    const c = (await b).data().count;   
 
    return c;
  }

  async verifycertifications(){
    const id = this.auth.currentUser.uid;
  
    const cakesRef = collection(this.firestore, `users/${id}/certifications/`)
    const q = query(cakesRef, where("name", "!=", "" ));
    const b = getCountFromServer(q);
    const c = (await b).data().count;   
 
    return c;
    
  }

 async  verifyresume(){
    const id = this.auth.currentUser.uid;
  
    const cakesRef = collection(this.firestore, `users/${id}/resume/`);
    const q = query(cakesRef, where("fa", "!=", "" ));
    const b = getCountFromServer(q);
    const c = (await b).data().count;   
 
    return c;
    
  }

  async  verifyrfile(){
    const id = this.auth.currentUser.uid;
  
    const cakesRef = collection(this.firestore, `users/${id}/resume/`);
    const q = query(cakesRef, where("fpath", "!=", "" ));
    const b = getCountFromServer(q);
    const c = (await b).data().count;   
 
    return c;
    
  }

  async uploadImage(cameraFile: Photo) {
    const user = this.auth.currentUser;
    const path = `uploads/users/${user.uid}/profile.png`;
    const storageRef = ref(this.storage, path);

    try {
      await uploadString(storageRef, cameraFile.base64String, 'base64');

      const imageUrl = await getDownloadURL(storageRef);
 
      const user = this.auth.currentUser.uid;

      const userDocRef = doc(this.firestore, `users/${user}/profile/${user}`);
      await updateDoc(userDocRef, {
        profileimg: imageUrl
      });

      const userDocRef2 = doc(this.firestore, `users/${user}/name/${user}`);
      await updateDoc(userDocRef2, {
        profileimg: imageUrl
      });
      return true;
    } catch (e) {
      return null;
      
    }
  }

  async uploadImagec(cameraFile: Photo) {
    const user = this.auth.currentUser;
    const path = `uploads/company/${user.uid}/profile.png`;
    const storageRef = ref(this.storage, path);

    try {
      await uploadString(storageRef, cameraFile.base64String, 'base64');

      const imageUrl = await getDownloadURL(storageRef);
 
      const user = this.auth.currentUser.uid;

      const userDocRef = doc(this.firestore, `employers/${user}/profile/${user}`);
      await updateDoc(userDocRef, {
        profileimg: imageUrl
      });

      const userDocRef2 = doc(this.firestore, `employers/${user}/namee/${user}`);
      await updateDoc(userDocRef2, {
        profileimg: imageUrl
      });
      return true;
    } catch (e) {
      return null;
      
    }
  }

  async uploadImagecl(cameraFile: Photo) {
    const user = this.auth.currentUser;
    const path = `uploads/company/${user.uid}/clogo.png`;
    const storageRef = ref(this.storage, path);

    try {
      await uploadString(storageRef, cameraFile.base64String, 'base64');

      const imageurl = await getDownloadURL(storageRef);
 
      const user = this.auth.currentUser.uid;

      const userDocRef = doc(this.firestore, `employers/${user}/company/${user}`);
      await updateDoc(userDocRef, {
         imageurl
      });
      return true;
    } catch (e) {
      return null;
      
    }
  }

  async uploadImagecl2(cameraFile: Photo) {
    const user = this.auth.currentUser;
    const path = `uploads/company/${user.uid}/brcert.png`;
    const storageRef = ref(this.storage, path);

    try {
      await uploadString(storageRef, cameraFile.base64String, 'base64');

      const imageUrl = await getDownloadURL(storageRef);
 
      const user = this.auth.currentUser.uid;

      const userDocRef = doc(this.firestore, `employers/${user}/company/${user}`);
      await updateDoc(userDocRef, {
         imageUrl
      });
      return true;
    } catch (e) {
      return null;
      
    }
  }

  async updatepref(specialization: any, exp: any){

    try {
      const userget = this.auth.currentUser?.uid;
      const userDocRef3 = doc(this.firestore, `users/${userget}/preferred/${userget}`);
      const user = await updateDoc(userDocRef3, {specialization, exp});
     
      return true;
    } catch (e) {
      return null;
    }
  }
  


}



