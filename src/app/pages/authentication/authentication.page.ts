import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ProfilingService } from 'src/app/services/profiling.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
})
export class AuthenticationPage implements OnInit {
  selectTabs: string = 'si';
  credentials: FormGroup;
  storage: any;

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private auth: AuthService,
    private router: Router,
    private profile: ProfilingService,
    private nc: NavController,
    private toastController: ToastController

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
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[0-9])(?=.*[!@#$%^&:;`~,*])[a-zA-Z0-9!@#$%^&:;`~,*]+$')]],
      
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

    if (user?.user?.uid != undefined) {

      if (user.user.emailVerified == false){
        await this.auth.resend();
        this.auth.logout;
          this.presentToast("Please Verify Email. A new activation link is sent to your email!");     
        
      }
      else{


        const data =  this.profile.verify().subscribe(res =>{
          console.log(" i run again")


          this.storage = res.length;


          if(this.storage === 1){
            this.nc.navigateRoot('dashboard');

            // this.router.navigate(['dashboard']);
            this.presentToast("Success. Login Success");  
          }
          else if (this.storage === 0){


            const data2 = this.profile.verifyc().subscribe(res =>{
              this.storage = res.length;

              if(this.storage === 1){
                // this.router.navigate(['homecompany']);
                this.nc.navigateRoot('dashboardcompany');
                this.presentToast("Success. Login Success"); 
              }else{
                console.log("irun")
                this.nc.navigateRoot('dashboardadmin');
                this.presentToast("Administrator. Login Success"); 
              }
              data2.unsubscribe();
            });
          }
          data.unsubscribe();
        });
     
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
  async presentToast(message: any) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();

  }

}
