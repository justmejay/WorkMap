import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ProfilingService } from 'src/app/services/profiling.service';

@Component({
  selector: 'app-editaboutme',
  templateUrl: './editaboutme.page.html',
  styleUrls: ['./editaboutme.page.scss'],
})
export class EditaboutmePage implements OnInit {
  profile: any = [];
  credentials: FormGroup;
  data: any;  
  
  
  get aboutme() {
    return this.credentials.get('aboutme');
  }



  constructor(
    private firestore: ProfilingService,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router,
    private toastController: ToastController

  ) {
    this.firestore.getprofile().subscribe(res=>{
      this.profile = res;

    });
   }

  ngOnInit() {

    this.credentials = this.fb.group({
      aboutme: ['', [Validators.required]],

    });
  }


  async editabout() {

    const loading = await this.loadingController.create({
      spinner: "dots",
      message: "Adding up!"
    });    await loading.present();

    const user = await this.firestore.editaboutme(this.credentials.get('aboutme').value);
    await loading.dismiss();

    if (user) {
      this.router.navigateByUrl('/applicantprofile', { replaceUrl: true });
      this.presentToast('Edit success. Data updated!');


        } else {
      this.presentToast('Edit failed. Please try again!');
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

  async presentToast(message: any) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();

  }
}
