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
  selector: 'app-editcompanydetails',
  templateUrl: './editcompanydetails.page.html',
  styleUrls: ['./editcompanydetails.page.scss'],
})
export class EditcompanydetailsPage implements OnInit {
  company: any = [];
  credentials: FormGroup;



  get cname() {
    return this.credentials.get('cname');
  }

  get ccontact() {
    return this.credentials.get('ccontact');
  }

  get cemail() {
    return this.credentials.get('cemail');
  }

  get csize() {
    return this.credentials.get('cname');
  }

  get cprocessingtime1() {
    return this.credentials.get('cprocessingtime1');
  }

  get cprocessingtime2() {
    return this.credentials.get('cprocessingtime2');
  }

  get cbenefits() {
    return this.credentials.get('cbenefits');
  }

  get street() {
    return this.credentials.get('street');
  }

  get barangay() {
    return this.credentials.get('barangay');
  }

  get town() {
    return this.credentials.get('town');
  }

  get province() {
    return this.credentials.get('province');
  }

  get country() {
    return this.credentials.get('country');
  }

  get cdetails() {
    return this.credentials.get('cdetails');
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
      this.company = res;

    })
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      cname: ['', [Validators.required]],
      ccontact: ['', [Validators.required]],
      cemail: ['', []],
      csize: ['', [Validators.required]],
      cprocessingtime1: ['', []],
      cprocessingtime2: ['', [Validators.required]],
      cbenefits: ['', [Validators.required]],
      street: ['', [Validators.required]],
      barangay: ['', [Validators.required]],
      town: ['', [Validators.required]],
      province: ['', [Validators.required]],
      country: ['', [Validators.required]],
      cdetails: ['', [Validators.required]],
    });
    
  }

  async editcompany() {

    const loading = await this.loadingController.create({
      spinner: "dots",
      message: "Adding up!"
    });    await loading.present();
    await loading.present();

    const employer = await this.firestore.editcompany(this.credentials.value);

    
    await loading.dismiss();

    if (employer) {
      this.router.navigateByUrl('/companyprofile', { replaceUrl: true });
      this.showAlert('Edit success', 'Data updated!');


        } else {
      this.showAlert('Edit failed', 'Please try again!');
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
