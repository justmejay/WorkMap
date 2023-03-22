import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-moresignupc',
  templateUrl: './moresignupc.page.html',
  styleUrls: ['./moresignupc.page.scss'],
})
export class MoresignupcPage implements OnInit {
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
  get contact() {
    return this.credentials.get('lname');
  }
  get cname() {
    return this.credentials.get('lname');
  }
  get ccontact() {
    return this.credentials.get('lname');
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
    return this.credentials.get('town');
  }
  get country() {
    return this.credentials.get('town');
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      fname: ['', [Validators.required]],
      mname: ['', []],
      lname: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      ccontact: ['', [Validators.required]],
      cname: ['', [Validators.required]],
      street: ['', [Validators.required]],
      barangay: ['', [Validators.required]],
      town: ['', [Validators.required]],
      province: ['', [Validators.required]],
      country: ['', [Validators.required]],
      
    });
    

  }


  async signupc() {

    const loading = await this.loadingController.create({
      spinner: "dots",
      message: "Signing up!"
    });    await loading.present();

    const user = await this.auth.signupc(this.credentials.value, this.authdetails.email, this.authdetails.password);
    await loading.dismiss();

    if (user) {
      await this.auth.logout();
      this.router.navigateByUrl('/forgotconfirm', { replaceUrl: true });

        } else {
      this.showAlert('Registration failed', 'Please try again!');
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
