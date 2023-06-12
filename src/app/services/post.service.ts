import { Injectable } from '@angular/core';
import { Auth, idToken } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc, collection, addDoc, collectionData, deleteDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { collectionGroup, CollectionReference, query, Query, queryEqual, updateDoc, WhereFilterOp } from 'firebase/firestore';
import { timeStamp } from 'console';
import { Photo } from '@capacitor/camera';
import {
  deleteObject,
  getDownloadURL,
  ref,
  Storage,
  uploadString,
} from '@angular/fire/storage';

export interface Post{
  //id is optional and not required
  //company
  id?: string,
  ptitle:string,
  pdescription:string,

  //profile
  fname: string,
  mname: string,
  lname: string

  //company 
  cname: string,


}

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private storage: Storage,
  ) { }

  async addpost({ptitle, pdescription, fname, mname, lname, cname, profileimg, timeStamp, pfsuffix}: 
    { ptitle: any, pdescription: any, fname: any, mname: any, lname: any,pfsuffix: any, cname: any, profileimg: any, timeStamp: any} ){

    try {

      const timeStamp = Date.now();
      const date: Date = new Date(timeStamp);
      const date2 = date.toLocaleString();

      const userget = this.auth.currentUser?.uid;
 
      const userDocRef3 = collection(this.firestore, `post/`);
      const user = await addDoc(userDocRef3, {uid: userget,pfsuffix, ptitle, pdescription, fname, mname, lname, cname, profileimg, timeStamp: date2, listid: "", timesort: timeStamp,});

      const id = user.id;

      const userDocRef4 = doc(this.firestore, `post/${id}`);
      const user2 = await updateDoc(userDocRef4, {listid: id });


      return user;
    } catch (e) {
      return null;
    }
  }

  getpost(): Observable<Post[]>{
    const cakesRef = collection(this.firestore, 'post/')
    return collectionData(cakesRef, {idField: 'id'}) as Observable<[Post]> 
  }

  async getImageData(cameraFile: Photo, sid: string){
    const user = this.auth.currentUser;
    const path = `post/${sid}/post.png`;
    const storageRef = ref(this.storage, path);
  
  
      await uploadString(storageRef, cameraFile.base64String, 'base64');
  
      const imageUrl = await getDownloadURL(storageRef);
      const userDocRef = doc(this.firestore, `post/${sid}`);
        updateDoc(userDocRef, {imageUrl});
  
  
    }


    getprofile(): Observable<Post[]>{
      const id = this.auth.currentUser.uid;
    
      const cakesRef = doc(this.firestore, `users/${id}/profile/${id}/`)
      return docData(cakesRef, {idField: 'id'}) as Observable<[Post]>
    }

    getcompany(): Observable<Post[]>{
      const id = this.auth.currentUser.uid;
 
    
      const cakesRef = doc(this.firestore, `employers/${id}/company/${id}`)
      return docData(cakesRef, {idField: 'id'}) as Observable<[Post]>
    }

    getemployer(): Observable<Post[]>{
      const id = this.auth.currentUser.uid;
 
    
      const cakesRef = doc(this.firestore, `employers/${id}/profile/${id}`)
      return docData(cakesRef, {idField: 'id'}) as Observable<[Post]>
    }

    getpostuser(id: any): Observable<Post[]>{
      const cakesRef = collection(this.firestore, 'post/')
      const q = query(cakesRef, where("uid", "==", id ))
      return collectionData(q, {idField: 'id'}) as Observable<[Post]> 
    }

    getpostid(id: any): Observable<Post[]>{
      const cakesRef = doc(this.firestore, `post/${id}`)
      return docData(cakesRef, {idField: 'id'}) as Observable<[Post]>
    }

    async editpost({ptitle, pdescription}: 
      {ptitle: any, pdescription: any}, id: any){
  
      try {
        const userDocRef3 = doc(this.firestore, `post/${id}`);
        const user = await updateDoc(userDocRef3, {ptitle, pdescription, });
       
        return true;
      } catch (e) {
        return null;
      }
    }

    deletepost(id: any){
      const cakeRef = doc(this.firestore, `post/${id}`)
      return deleteDoc(cakeRef)
    }

    async deletepic(id: any){
  
      const fileStoragePath = `post/${id}/post.png`;
      const storageRef = ref(this.storage, fileStoragePath);
      await deleteObject(storageRef);
    }
  

    
}


