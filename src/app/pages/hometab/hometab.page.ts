import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
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
  selector: 'app-hometab',
  templateUrl: './hometab.page.html',
  styleUrls: ['./hometab.page.scss'],
})
export class HometabPage implements OnInit {
  post: any = [];
  profile: any = [];

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
    
  ) {

    
      this.firestore.getpost().subscribe(res=>{
        this.post = res;
        console.log(this.post)
      })

      this.firestore.getprofile().subscribe(res => {
        this.profile = res;
        console.log(this.profile);
      });

   
   }

  ngOnInit(
    
  ) {
  }

  addpost(profile:any){
    const uid = profile.uid
    const fname = profile.fname
    const mname = profile.mname
    const lname = profile.lname
    
    const cname = null

  
    this.router.navigate(['addpost'], {queryParams:{puid:uid, pfname:fname, pmname: mname, plname: lname, pcname: cname,}});
  }

  

}
