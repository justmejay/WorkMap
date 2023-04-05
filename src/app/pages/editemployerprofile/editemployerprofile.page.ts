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
  selector: 'app-editemployerprofile',
  templateUrl: './editemployerprofile.page.html',
  styleUrls: ['./editemployerprofile.page.scss'],
})
export class EditemployerprofilePage implements OnInit {
  employer: any = [];
  credentials: FormGroup;

  get fname() {
    return this.credentials.get('fname');
  }

  get mname() {
    return this.credentials.get('mname');
  }

  get lname() {
    return this.credentials.get('lname');
  }

  get contact() {
    return this.credentials.get('contact');
  }

  get email() {
    return this.credentials.get('email');
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
    this.firestore.getemployer().subscribe(res=>{
      this.employer = res;

    })
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      fname: ['', [Validators.required]],
      mname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });
  }


  async editemployer() {

    const loading = await this.loadingController.create({
      spinner: "dots",
      message: "Adding up!"
    });    await loading.present();
    await loading.present();

    const employer = await this.firestore.editemployer(this.credentials.value);

    
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
