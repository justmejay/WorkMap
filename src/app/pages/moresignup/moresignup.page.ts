import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-moresignup',
  templateUrl: './moresignup.page.html',
  styleUrls: ['./moresignup.page.scss'],
})
export class MoresignupPage implements OnInit {
  isInputEnabled = false;
  isInput2Enabled = false;
  authdetails: any = [];
  credentials: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private auth: AuthService,
    private router: Router
  ) {
    this.activatedRoute.queryParams.subscribe((params) =>{
      this.authdetails = params;
      console.log(this.authdetails)

      });



   }

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
  get specialization() {
    return this.credentials.get('specialization'); 
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

  get sex() {
    return this.credentials.get('sex'); 
  }

  ngOnInit() {

    this.credentials = this.fb.group({
      fname: ['', [Validators.required]],
      mname: ['', ],
      lname: ['', [Validators.required]],
      suffix: ['', ],
      bday: ['', [Validators.required]],
      age: ['', [Validators.required]],
      street: ['', [Validators.required]],
      barangay: ['', [Validators.required]],
      town: ['', [Validators.required]],
      province: ['', [Validators.required]],
      country: ['', [Validators.required]],
      specialization: ['', [Validators.required]],
      sex: ['', [Validators.required]],
      hstreet: ['', [Validators.required]],
      hbarangay: ['', [Validators.required]],
      htown: ['', [Validators.required]],
      hprovince: ['', [Validators.required]],
      hcountry: ['', [Validators.required]],

      
    });

  }


  async signup() {

    const loading = await this.loadingController.create({
      spinner: "dots",
      message: "Signing up!"
    });    await loading.present();

    const user = await this.auth.signup(this.credentials.value, this.authdetails.email, this.authdetails.password);
    await loading.dismiss();

    if (user) {
      await this.auth.logout();
      this.router.navigateByUrl('/forgotconfirm', { replaceUrl: true });

        } else {
      this.showAlert('Registration failed', 'Please try again!');
    }
  }




  toggleInput(event: any) {
    this.isInputEnabled = event.detail.checked;
  }

  toggleInput2(event: any) {
    this.isInput2Enabled = event.detail.checked;
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
