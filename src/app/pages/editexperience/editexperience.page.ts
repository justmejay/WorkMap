import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ProfilingService } from 'src/app/services/profiling.service';

@Component({
  selector: 'app-editexperience',
  templateUrl: './editexperience.page.html',
  styleUrls: ['./editexperience.page.scss'],
})
export class EditexperiencePage implements OnInit {
  experience: any;
  exdetails: any = [];
  credentials: FormGroup;

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private profile:  ProfilingService,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router
  ) {
    this.activatedRoute.queryParams.subscribe((params) =>{
      this.experience = params['cid'];
      console.log(this.experience)

      this.profile.getExpbyID(this.experience).subscribe(res => {
        this.exdetails = res;
        console.log(this.exdetails);
      });


      });
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

  
  async editex() {

    const loading = await this.loadingController.create({
      spinner: "dots",
      message: "Adding up!"
    });    await loading.present();

    const user = await this.profile.editex(this.credentials.value, this.experience);
    await loading.dismiss();

    if (user) {
      this.router.navigateByUrl('/experience', { replaceUrl: true });
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
