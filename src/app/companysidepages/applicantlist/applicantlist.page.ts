import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ApplicationService } from 'src/app/services/application.service'; 
import {
  getDownloadURL,
  ref,
  Storage,
  uploadString,
  uploadBytes,
  deleteObject
} from '@angular/fire/storage';
import { Auth } from '@angular/fire/auth';


@Component({
  selector: 'app-applicantlist',
  templateUrl: './applicantlist.page.html',
  styleUrls: ['./applicantlist.page.scss'],
})
export class ApplicantlistPage implements OnInit {

  job: any = [];
  
  jobid: any;

  jobs: any = [];

  title: any = [];

  id: any;

  lname: any;

  name: any;

  


  constructor(
    private firestore: ApplicationService,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private auth: AuthService,
    private router: Router,
    private storage: Storage,
    private authd: Auth,
    private activatedRoute: ActivatedRoute,
  ) { 
    
    this.activatedRoute.queryParams.subscribe((params) =>{

    this.job = params;
    console.log(this.job.jobid)

    this.firestore.getapplicants(this.job.jobid).subscribe(res => {
      this.jobs = res;
      console.log(this.jobs);
     
      
      

      

    });


    this.firestore.getjtitle(this.job.jobid).subscribe(res => {
      this.title = res;
      console.log(this.title);
    });


   



    


  });

    
    
  }

  ngOnInit() {
    
  }

}
