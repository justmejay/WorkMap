import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Router, ActivatedRoute } from '@angular/router'
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-listemployees',
  templateUrl: './listemployees.page.html',
  styleUrls: ['./listemployees.page.scss'],
})
export class ListemployeesPage implements OnInit {

  employers: any = [];

  constructor(
    private firestore: AdminService,
    private router: Router,
    private nc: NavController,
    private activatedRoute: ActivatedRoute,
    private toastController : ToastController,
    private loadingController: LoadingController,
    private alertController: AlertController,
  ) {
    this.firestore.getallemployers().subscribe(res=>{
      this.employers = res;
      console.log(this.employers)

    })
   }

  ngOnInit() {
  }

  view(employers:any){
    const id = employers.uid
    console.log(employers.uid)

  
    this.router.navigate(['viewemployerprofile'], {queryParams:{uid:id}});
  }

  async delete(employers: any){
    const loading = await this.loadingController.create({
      spinner: "dots",
      message: "Deleting up!"
    });    await loading.present();

    const id = employers.uid;
    await this.firestore.deleteemployers(id);

    await loading.dismiss();
    this.presentToast('Employer information successfully deleted!');


  }


  async presentToast(message: any){
    const toast = await this.toastController.create({
      message,
      duration: 1000,
    });
    await toast.present();
  }


}
