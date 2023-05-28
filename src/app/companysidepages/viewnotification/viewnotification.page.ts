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
import { ProfilingService } from 'src/app/services/profiling.service';


@Component({
  selector: 'app-viewnotification',
  templateUrl: './viewnotification.page.html',
  styleUrls: ['./viewnotification.page.scss'],
})
export class ViewnotificationPage implements OnInit {

  jobs: any = [];
  
  jobdata: any = [];
  pdetails: any = [];
  bdetails: any = [];
  loopdata: any = [];
  expdata: any = [];
  educdata: any = [];
  certdata: any = [];
  reason: any;


  




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
    private app: ApplicationService,
    private profile: ProfilingService
  ) { 

    this.activatedRoute.queryParams.subscribe((params) =>{

      this.jobs = params;
      console.log(this.jobs.id);

      this.app.getapplication(this.jobs.id).subscribe(res=>{
        this.jobdata = res;
        this.bdetails = this.jobdata.application.addressdetails;
        this.loopdata = this.jobdata.application.resumedetails;
        this.expdata =  this.jobdata.application.experiencedetails;
        this.educdata =  this.jobdata.application.schooldetails;
        this.certdata =  this.jobdata.application.certificationsdetails;
        this.reason = this.jobdata.application.reason;


      
       this.profile.getprofilebyid(this.jobdata.application.uid).subscribe(res=> {
        this.pdetails = res;

        if (this.pdetails.ea == '1'){
          this.pdetails.ea = 'High School Diploma';
        }else  if (this.pdetails.ea == '2'){
          this.pdetails.ea = 'Vocational Diploma/Short Course Certificate';
        }else if (this.pdetails.ea == '3'){
          this.pdetails.ea = 'Bachelors/College Degree';
        }else if (this.pdetails.ea == 'Post Graduate Diploma/Masters Degree'){
          this.pdetails.ea = 'Vocational Diploma/Short Course Certificate';
        }else if (this.pdetails.ea == '5'){
          this.pdetails.ea = 'Professional License (Passed Board/Professional/License Exams)';
        }else if (this.pdetails.ea == '6'){
          this.pdetails.ea = 'Doctorate Degree';
        }


       });
      });

  });
    
}

  ngOnInit() {

   
  }

 

}
