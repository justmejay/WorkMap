import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ProfilingService } from 'src/app/services/profiling.service';

@Component({
  selector: 'app-addschool',
  templateUrl: './addschool.page.html',
  styleUrls: ['./addschool.page.scss'],
})
export class AddschoolPage implements OnInit {
  credentials: FormGroup;
 
  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private firestore: ProfilingService,
    private router: Router,
    private toastController: ToastController
  ) { }

  get schoolname() {
    return this.credentials.get('schoolname');
  }
  get level() {
    return this.credentials.get('level');
  }

  get course() {
    return this.credentials.get('course');
  }
  get yearg() {
    return this.credentials.get('yearg');
  }

  ngOnInit() {

    this.credentials = this.fb.group({
      schoolname: ['', [Validators.required,]],
      level: ['', [Validators.required,]],
      yearg: ['', []],
      course: ['', [Validators.required,]],
      
    });

  }



  
  async addsc() {

    const loading = await this.loadingController.create({
      spinner: "dots",
      message: "Adding up!"
    });    await loading.present();

    const user = await this.firestore.addsc(this.credentials.value);
    await loading.dismiss();

    if (user) {
      this.router.navigateByUrl('/school', { replaceUrl: true });
      this.presentToast('Add success. Great job building your profile!');


        } else {
      this.presentToast('Add failed. Please try again!');
    }
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
