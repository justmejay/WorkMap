import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ProfilingService } from 'src/app/services/profiling.service';

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.page.html',
  styleUrls: ['./certifications.page.scss'],
})
export class CertificationsPage implements OnInit {
  certification: any=[];


  constructor(
    private profile: ProfilingService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController : ToastController
  ) {
    
    this.profile.getcertification().subscribe(res=>{
      this.certification = res;
      console.log(this.certification)

    })

   }

  ngOnInit() {
  }

  async editcert(e: any){

    const id = e.id;
    this.router.navigate(['/editcertifications'], {queryParams:{cid: id}});

  }

  async deletecert(e: any){
    const loading = await this.loadingController.create({
      spinner: "dots",
      message: "Deleting up!"
    });    await loading.present();

    const id = e.id;
    await this.profile.deletecdoc(id);

    await loading.dismiss();
    this.presentToast('Delete success. Data Updated');



  

  }

  async showAlert(header: any, message: any) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentToast(message: any){
    const toast = await this.toastController.create({
      message,
      duration: 1000,
    });
    await toast.present();
  }

}
