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
  selector: 'app-mypostcompany',
  templateUrl: './mypostcompany.page.html',
  styleUrls: ['./mypostcompany.page.scss'],
})
export class MypostcompanyPage implements OnInit {
  post: any = [];
  // profile: any = [];

  employer: any = [];
  
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
    
  ) {

    this.activatedRoute.queryParams.subscribe((params) =>{

      this.employer = params
      console.log(this.employer.usid)
      
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

      this.firestore.getpostuser(this.employer.usid).subscribe(res=> {
        this.post = res;
        console.log(this.post)
      })

    })
    
      

   
   }

  ngOnInit(
    
  ) {
  }

}
