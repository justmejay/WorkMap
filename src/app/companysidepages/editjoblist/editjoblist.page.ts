import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { CompanyService } from 'src/app/services/company.service'; 

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
  selector: 'app-editjoblist',
  templateUrl: './editjoblist.page.html',
  styleUrls: ['./editjoblist.page.scss'],
})
export class EditjoblistPage implements OnInit {
  job: any = [];
  credentials: FormGroup;
  jobs: any = [];

  get jtitle() {
    return this.credentials.get('jtitle');
  }

  get jsalary() {
    return this.credentials.get('jsalary');
  }

  get jposition() {
    return this.credentials.get('jposition');
  }

  get jtype() {
    return this.credentials.get('jtype');
  }

  get jdescription() {
    return this.credentials.get('jdescription');
  }

  get jexperience() {
    return this.credentials.get('jexperience');
  }

  get attainment() {
    return this.credentials.get('attainment');
  }

  constructor(private firestore: CompanyService,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private auth: AuthService,
    private router: Router,
    private storage: Storage,
    private authd: Auth,
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.queryParams.subscribe((params) =>{

      this.job = params;
      console.log(this.job.jobid)
  
      this.firestore.getjobe(this.job.jobid).subscribe(res => {
        this.jobs = res;
        console.log(this.jobs.jtitle);
      });

    })
   }

  ngOnInit() {
    this.credentials = this.fb.group({
      jtitle: ['', [Validators.required]],
      jsalary: ['', [Validators.required]],
      jtype: ['', [Validators.required]],
      jdescription: ['', [Validators.required]],
      jexperience: ['', []],
      attainment: ['', []],

    });
  }

  async editjoblisting() {

    const loading = await this.loadingController.create({
      spinner: "dots",
      message: "Adding up!"
    });    await loading.present();
    await loading.present();

    const joblistling = await this.firestore.editjoblisting(this.credentials.value, this.job.jobid);

  

    
    await loading.dismiss();

    if (joblistling) {
      this.router.navigateByUrl('/dashboardcompany', { replaceUrl: true });
      // this.toastPresent('Edit success. Data updated!');


      //   } else {
      // this.toastPresent('Edit failed. Please try again!'); 
    }
  }

}
