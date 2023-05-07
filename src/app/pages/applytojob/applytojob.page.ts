import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ApplicationService } from 'src/app/services/application.service';
// import { CompanyService } from 'src/app/services/company.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
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
  selector: 'app-applytojob',
  templateUrl: './applytojob.page.html',
  styleUrls: ['./applytojob.page.scss'],
})
export class ApplytojobPage implements OnInit {
  profiledetails: any = [];
  addressdetails: any = [];
  resumedetails: any = [];
  certificationsdetails: any = []; 
  schooldetails: any = [];
  experiencedetails: any = [];

  reas: any = [];
  credentials: FormGroup;

  profile: any;
  address: any;
  resume: any;
  certifications: any;
  school: any;
  experience: any;

  job: any =[];
  jobid: any;

 


  get reason() {
    return this.credentials.get('reason');
  }

  constructor(
    private firestore: ApplicationService,
    // private company: CompanyService,
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
      this.firestore.getprofile().subscribe(res=>{
      this.profiledetails = res;

    })
    this.firestore.getaddress().subscribe(res=>{
      this.addressdetails = res;
    })
    this.firestore.getcertification().subscribe(res=>{
      this.certificationsdetails = res;

    })

    this.firestore.getexperience().subscribe(res=>{
      this.experiencedetails = res;

    })

    this.firestore.getschool().subscribe(res=>{
      this.schooldetails = res;

    })

    this.firestore.getresume().subscribe(res=>{
      this.resumedetails = res;

    })

    // this.firestore.getjob().subscribe(res =>{
    //     this.job = res;
    //   });

    this.job = params;
    console.log(this.job)

    




     });
    


  }

  ngOnInit() {
    this.credentials = this.fb.group({
      reason: ['', [Validators.required]],
    });

    
  }

  async addApplication() {
    const application = {
      addressdetails: this.addressdetails,
      resumedetails: this.resumedetails,
      certificationsdetails: this.certificationsdetails,
      schooldetails: this.schooldetails,
      experiencedetails: this.experiencedetails,
      
    };

    const jobid = {
      jobid: this.job.jobid,
    }
    const get = await this.firestore.addApplication({
      ...application, 
      ...this.credentials.value,
      ...jobid
    });
    
    this.router.navigateByUrl('/dashboard', { replaceUrl: true });
  }
  
  
}
