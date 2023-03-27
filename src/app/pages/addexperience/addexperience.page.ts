import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ProfilingService } from 'src/app/services/profiling.service';

@Component({
  selector: 'app-addexperience',
  templateUrl: './addexperience.page.html',
  styleUrls: ['./addexperience.page.scss'],
})
export class AddexperiencePage implements OnInit {
  credentials: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private profile: ProfilingService,
    private router: Router
  ) { }

  get cname() {
    return this.credentials.get('cname');
  }
  get caddress() {
    return this.credentials.get('caddress');
  }
  get datef() {
    return this.credentials.get('datef');
  }
  get datet() {
    return this.credentials.get('datet');
  }
  get jtitle() {
    return this.credentials.get('jtitle ');
  }

  ngOnInit() {

    this.credentials = this.fb.group({
      cname: ['', [Validators.required]],
      caddress: ['', [Validators.required]],
      jtitle: ['', [Validators.required]],
      datet: ['', [Validators.required]],
      datef: ['', [Validators.required]],
    });

  }


  async adde() {

    const loading = await this.loadingController.create({
      spinner: "dots",
      message: "Adding up!"
    });    await loading.present();

    const user = await this.profile.addex(this.credentials.value);
    await loading.dismiss();

    if (user) {
      this.router.navigateByUrl('/experience', { replaceUrl: true });
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
