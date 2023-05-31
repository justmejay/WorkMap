import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service'; 
import {
  getDownloadURL,
  ref,
  Storage,
  uploadString,
  uploadBytes,
  deleteObject
} from '@angular/fire/storage';
import { Auth } from '@angular/fire/auth';
import { Profiler } from 'inspector';

@Component({
  selector: 'app-mypostuser',
  templateUrl: './mypostuser.page.html',
  styleUrls: ['./mypostuser.page.scss'],
})
export class MypostuserPage implements OnInit {
  post: any = [];
  // profile: any = [];

  profiles: any = [];
  
  constructor(
    private firestore: PostService,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private auth: AuthService,
    private router: Router,
    private storage: Storage,
    private authd: Auth,
    private nc: NavController,
    private activatedRoute: ActivatedRoute,
    private toastController : ToastController
    
  ) {

    this.activatedRoute.queryParams.subscribe((params) =>{

      this.profiles = params
      console.log(this.profiles.usid)
      
      // this.firestore.getpost().subscribe(res=>{
      //   this.post = res;
      //   console.log(this.post)
      // })

      // this.firestore.getprofile().subscribe(res => {
      //   this.profile = res;
      //   console.log(this.profile);
      // });

      // this.firestore.getprofile().subscribe(res => {
      //   this.profile = res;
      //   console.log(this.profile);
      // });

      this.firestore.getpostuser(this.profiles.usid).subscribe(res=> {
        this.post = res;
        console.log(this.post)

        this.post.sort((a, b) => {
          return b.timesort - a.timesort;
        });
      })

    })
    
      

   
   }

  ngOnInit(
    
  ) {
    
  }

  
  edit(post:any){
    const id = post.listid

  
    this.router.navigate(['editpostuser'], {queryParams:{postid:id,}});
  }

  async delete(post: any){
    const loading = await this.loadingController.create({
      spinner: "dots",
      message: "Deleting up!"
    });    await loading.present();

    const id = post.id;
    await this.firestore.deletepost(id);
    this.firestore.deletepic(id)

    await loading.dismiss();
    this.presentToast('Post successfully deleted!');


  }


  async presentToast(message: any){
    const toast = await this.toastController.create({
      message,
      duration: 1000,
    });
    await toast.present();
  }

}
