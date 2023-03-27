import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ProfilingService } from 'src/app/services/profiling.service';

@Component({
  selector: 'app-editaddress',
  templateUrl: './editaddress.page.html',
  styleUrls: ['./editaddress.page.scss'],
})
export class EditaddressPage implements OnInit {
  address: any = [];
  credentials: FormGroup;



  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private firestore: ProfilingService,
    private router: Router
  ) {

    this.firestore.getaddress().subscribe(res=>{
      this.address = res;
    });
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
  get hstreet() {
    return this.credentials.get('hstreet');
  }
  get hbarangay() {
    return this.credentials.get('hbarangay');
  }
  get htown() {
    return this.credentials.get('htown');
  }
  get hprovince() {
    return this.credentials.get('hprovince');
  }
  get hcountry() {
    return this.credentials.get('hcountry');
  }



  ngOnInit() {

    this.credentials = this.fb.group({
      street: ['', [Validators.required]],
      barangay: ['', [Validators.required]],
      town: ['', [Validators.required]],
      province: ['', [Validators.required]],
      country: ['', [Validators.required]],
      hstreet: ['', [Validators.required]],
      hbarangay: ['', [Validators.required]],
      htown: ['', [Validators.required]],
      hprovince: ['', [Validators.required]],
      hcountry: ['', [Validators.required]],
      
    });

  }



  async editadd() {

    const loading = await this.loadingController.create({
      spinner: "dots",
      message: "Adding up!"
    });    await loading.present();

    const user = await this.firestore.editaddress(this.credentials.value);
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
