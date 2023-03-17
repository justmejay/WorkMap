import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {
  credentials: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router
  ) { }

  get email() {
    return this.credentials.get('email');
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
     

    });
  }



  async forgot() {
    const loading = await this.loadingController.create({
      spinner: "dots",
      message: "Sending Verification!"
    });
    await loading.present();
    const user = await this.authService.forgot(this.credentials.value); 
    await loading.dismiss();
      this.showAlert("Success", "You should recieve a email reset link if you're registered");
     this.credentials.get('email')?.reset();
  }


  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }


  
}
