import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
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
  selector: 'app-addjoblisting',
  templateUrl: '/addjoblisting.page.html',
  styleUrls: ['/addjoblisting.page.scss'],
})
export class AddjoblistingPage implements OnInit {
  job: any = [];
  credentials: FormGroup;

  get jtitle() {
    return this.credentials.get('jtitle');
  }

  get jsalary() {
    return this.credentials.get('jsalary');
  }

  get jspecialization() {
    return this.credentials.get('jspecialization');
  }

  get jtype() {
    return this.credentials.get('jtype');
  }

  get cname() {
    return this.credentials.get('cname');
  }

  get caddress() {
    return this.credentials.get('caddress');
  }

  get ccontact() {
    return this.credentials.get('ccontact');
  }

  get cemail() {
    return this.credentials.get('cemail');
  }

  get cdetails() {
    return this.credentials.get('cdetails');
  }

  get csize() {
    return this.credentials.get('csize');
  }

  get cprocessingtime() {
    return this.credentials.get('cprocessingtime');
  }

  get cbenefits() {
    return this.credentials.get('cbenefits');
  }

  constructor(
    private firestore: CompanyService,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private auth: AuthService,
    private router: Router,
    private storage: Storage,
    private authd: Auth
  ) {
    this.firestore.getcompany().subscribe(res=>{
      this.job = res;
    })
   }

  ngOnInit() {
    this.credentials = this.fb.group({
      jtitle: ['', [Validators.required]],
      jsalary: ['', [Validators.required]],
      jspecialization: ['', []],
      jtype: ['', [Validators.required]],
      cname: ['', []],
      caddress: ['', [Validators.required]],
      ccontact: ['', [Validators.required]],
      cemail: ['', [Validators.required]],
      cdetails: ['', [Validators.required]],
      csize: ['', [Validators.required]],
      cprocessingtime: ['', [Validators.required]],
      cbenefits: ['', [Validators.required]],
    });
    
  }

  async addjoblisting() {

    const loading = await this.loadingController.create({
      spinner: "dots",
      message: "Adding up!"
    });    await loading.present();

    const user = await this.firestore.addjoblisting(this.credentials.value);
    await loading.dismiss();

    if (user) {
      this.router.navigateByUrl('/dashboardcompany', { replaceUrl: true });
      this.showAlert('Add success', '');


        } else {
      this.showAlert('Add failed', 'Please try again!');
    }
  }




  async showAlert(header: any, message: any) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }


}
