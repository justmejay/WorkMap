import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
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
    private router: Router
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
      this.showAlert('Add success', 'Great job building your profile!');


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
