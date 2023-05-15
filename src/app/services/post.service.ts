import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc, collection, addDoc, collectionData, deleteDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { collectionGroup, CollectionReference, query, Query, queryEqual, updateDoc, WhereFilterOp } from 'firebase/firestore';
import { timeStamp } from 'console';
import { Photo } from '@capacitor/camera';
import {
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

  async addpost({ptitle, pdescription, fname, mname, lname, cname,}: 
    { ptitle: any, pdescription: any, fname: any, mname: any, lname: any, cname: any,} ){

    try {

      const userget = this.auth.currentUser?.uid;
 
      const userDocRef3 = collection(this.firestore, `post/`);
      const user = await addDoc(userDocRef3, {uid: userget, ptitle, pdescription, fname, mname, lname, cname });

      


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
}
