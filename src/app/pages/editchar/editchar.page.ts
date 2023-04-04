import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ProfilingService } from 'src/app/services/profiling.service';

@Component({
  selector: 'app-editchar',
  templateUrl: './editchar.page.html',
  styleUrls: ['./editchar.page.scss'],
})
export class EditcharPage implements OnInit {
  resume: any = [];
  credentials: FormGroup;

  get mo() {
    return this.credentials.get('mo');
  }
  get moc() {
    return this.credentials.get('moc');
  }
  get fa() {
    return this.credentials.get('fa');
  }
  get fac() {
    return this.credentials.get('fac');
  }
 


  constructor(
    private profile: ProfilingService,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router
  ) {
    this.profile.getresume().subscribe(res=>{
      this.resume = res;

    });

    
   }

  ngOnInit() {
    this.credentials = this.fb.group({
      mo: ['', [Validators.required]],
      moc: ['', [Validators.required]],
      fa: ['', [Validators.required]],
      fac: ['', [Validators.required]],
      });
  }

  
  async editchar() {

    const loading = await this.loadingController.create({
      spinner: "dots",
      message: "Adding up!"
    });    await loading.present();

    const user = await this.profile.editref(this.credentials.value);
    await loading.dismiss();

    if (user) {
      this.router.navigateByUrl('/resumebuilder', { replaceUrl: true });
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
