import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ProfilingService } from 'src/app/services/profiling.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.page.html',
  styleUrls: ['./experience.page.scss'],
})
export class ExperiencePage implements OnInit {
  experience: any = []

  constructor(private profile: ProfilingService, private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController) {

    this.profile.getexperience().subscribe(res=>{
      this.experience = res;
      console.log(this.experience)

    })

   }

   async edit(e: any){
    const id = e.id;
    console.log(id);

    this.router.navigate(['editexperience'], {queryParams:{cid: id}});

   }

  ngOnInit() {

  }

  async deletexp(e: any){
    const loading = await this.loadingController.create({
      spinner: "dots",
      message: "Deleting up!"
    });    await loading.present();

    const id = e.id;
    await this.profile.deleteedoc(id);

    await loading.dismiss();
    this.showAlert('Delete success', 'Data Updated');



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
