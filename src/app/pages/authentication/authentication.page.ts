import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
})
export class AuthenticationPage implements OnInit {
  selectTabs: string = 'si';
  credentials: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private auth: AuthService,
    // private authService:,
    private router: Router
  ) {
    
   }

   get email() {
    return this.credentials.get('email');
  }
  get password() {
    return this.credentials.get('password');
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      
    });
  }
  
  async signup(){

    const loading = await this.loadingController.create({
      spinner: "dots",
      message: "Creating Account"
    });
    await loading.present();
    const user = await this.auth.signup(this.credentials.value); 
    await loading.dismiss();

    if (user) {
      
      this.router.navigateByUrl('/authentication', { replaceUrl: true });
      this.showAlert('Success', `Please verify your account before logging in!`);    
        } else {
      this.showAlert('Registration failed', 'Please try again!');
    }



  }


  async login() {
    const loading = await this.loadingController.create({
      spinner: "dots",
      message: "Signing in!"
    });
    await loading.present();
    const user = await this.auth.login(this.credentials.value); 
    await loading.dismiss();

    if (user) {
      if (user.user.emailVerified == false){
        await this.auth.resend();
        this.auth.logout;
          this.showAlert("Verify Email", "Please verify your email! A new activation link is sent to your email!");     
        
      }
      else{
        this.showAlert("Success", "Login Success");     

      }

    } else {
      this.showAlert('Login failed', 'Incorrect Email/Password!');
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
