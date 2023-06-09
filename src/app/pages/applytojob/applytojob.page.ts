import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
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

export interface User{
  //id is optional and not required
  //profile
  id?: string,
  profileimg: string,
  specialization: string,
  age: number,
  bday: string,
  contact: number, 
  email: string,
  fname: string,
  gender: string,
  lname: string,
  mname: string,
  suffix: string,
  aboutme: string,
  exception: any,
  

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

  job:any;





  
}


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
  listdetails: any = [];

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
  cid: any;
  jtitle: any;

 


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
    private toastController: ToastController
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

   

 

    this.job = params;
    console.log(this.job)
    this.cid = params;
    console.log(this.cid)
    this.jtitle = params;
    console.log(this.jtitle)

    
    this.firestore.getjoblist(this.job.jobid).subscribe(res=>{
     this.listdetails = res;
     console.log(this.profiledetails.uid);
     
    if(res.length == undefined){
      this.listdetails.exception[0] = this.profiledetails.uid;
    }else{
      console.log("irun")
      this.listdetails.exception[res.length] = this.profiledetails.uid;
    }
    console.log(this.listdetails)

    });


     });
    


  }

  ngOnInit() {
    this.credentials = this.fb.group({
      reason: ['', [Validators.required]],
    });

    
  }

  async addApplication() {



    const loading  =  await this.loadingController.create({
      message: 'Submitting Application',
      spinner: 'dots',
    });
    await loading.present();
    const application = {
      addressdetails: this.addressdetails,
      resumedetails: this.resumedetails,
      certificationsdetails: this.certificationsdetails,
      schooldetails: this.schooldetails,
      experiencedetails: this.experiencedetails,
      uid: this.profiledetails.uid,
      fname: this.profiledetails.fname,
      mname: this.profiledetails.mname,
      lname: this.profiledetails.lname,
      profileimg: this.profiledetails.profileimg,
      
    };

    const id = {
      jobid: this.job.jobid,
      cid: this.job.cid,
      jtitle: this.job.jtitle,
    }
    const get = await this.firestore.addApplication({
      ...application, 
      ...this.credentials.value,
      ...id,
    }, this.listdetails.exception);
    await loading.dismiss();
    this.router.navigateByUrl('/dashboard', { replaceUrl: true });
    const present = await this.toastController.create({
      message: 'Application Success',
      duration: 1000
    });
    await present.present();
   

  }
  
  
}
