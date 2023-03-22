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

    this.router.navigate(['moresignup'], {queryParams:{email: this.email.value, password: this.password.value}});

    }

    async signupc(){

      this.router.navigate(['moresignupc'], {queryParams:{email: this.email.value, password: this.password.value}});
  
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
          this.showAlert("Please Verify Email", "A new activation link is sent to your email!");     
        
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
