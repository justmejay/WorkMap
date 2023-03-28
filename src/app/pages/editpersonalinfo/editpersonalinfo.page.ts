import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ProfilingService } from 'src/app/services/profiling.service';

@Component({
  selector: 'app-editpersonalinfo',
  templateUrl: './editpersonalinfo.page.html',
  styleUrls: ['./editpersonalinfo.page.scss'],
})
export class EditpersonalinfoPage implements OnInit {
  profile: any = [];
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
  get suffix() {
    return this.credentials.get('suffix');
  }
  get bday() {
    return this.credentials.get('bday');
  }
  get age() {
    return this.credentials.get('age');
  }
  get sex() {
    return this.credentials.get('bday');
  }
  get contact() {
    return this.credentials.get('age');
  }

  constructor(
    private firestore: ProfilingService,
   private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private auth: AuthService,
    private router: Router

  ) {
    this.firestore.getprofile().subscribe(res=>{
      this.profile = res;

    })
   }




  ngOnInit() {
    this.credentials = this.fb.group({
      fname: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      mname: ['', []],
      lname: ['', [Validators.required]],
      suffix: ['', []],
      bday: ['', [Validators.required]],
      age: ['', [Validators.required]],
      sex: ['', [Validators.required]],
    });
    
  }

  async editprofile() {

    const loading = await this.loadingController.create({
      spinner: "dots",
      message: "Adding up!"
    });    await loading.present();

    const user = await this.firestore.editprofile(this.credentials.value);
    await loading.dismiss();

    if (user) {
      this.router.navigateByUrl('/applicantprofile', { replaceUrl: true });
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
