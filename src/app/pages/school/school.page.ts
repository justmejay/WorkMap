import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ProfilingService } from 'src/app/services/profiling.service';

@Component({
  selector: 'app-school',
  templateUrl: './school.page.html',
  styleUrls: ['./school.page.scss'],
})
export class SchoolPage implements OnInit {
  school: any=[];


  constructor(
    private profile: ProfilingService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController
  ) { 




    this.profile.getschool().subscribe(res=>{
      this.school = res;
      console.log(this.school)

    })

  }

  ngOnInit() {
  }

  async editsc(e: any){

    const id = e.id;

    this.router.navigate(['editschool'], {queryParams:{cid: id}});


  }

  async deletesc(e: any){
    const loading = await this.loadingController.create({
      spinner: "dots",
      message: "Deleting up!"
    });    await loading.present();

    const id = e.id;
    await this.profile.deletesdoc(id);

    await loading.dismiss();
    this.presentToast('Delete success. Data Updated');



  

  }

  async presentToast(message: any) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();

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
