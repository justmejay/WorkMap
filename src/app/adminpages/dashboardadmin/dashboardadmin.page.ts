import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Router, ActivatedRoute } from '@angular/router'
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-dashboardadmin',
  templateUrl: './dashboardadmin.page.html',
  styleUrls: ['./dashboardadmin.page.scss'],
})
export class DashboardadminPage implements OnInit {
  count: any;
  users: any = [];

  constructor(
    private firestore: AdminService,
    private router: Router,
    private nc: NavController,
    private activatedRoute: ActivatedRoute,
    private toastController : ToastController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private auth: AuthService
  ) {
    this.firestore.getallusers().subscribe(res=>{
      this.users = res;
      console.log(this.users)

    });

    this.firestore.getallcompany().subscribe(res=>{
      this.count = res.length;
    });
   }

  ngOnInit() {
  }

  view(users:any){
    const id = users.uid
    console.log(users.uid)

  
    this.router.navigate(['viewuserproile'], {queryParams:{uid:id}});
  }

  async delete(users: any){
    const loading = await this.loadingController.create({
      spinner: "dots",
      message: "Deleting up!"
    });    await loading.present();

    const id = users.uid;
    await this.firestore.deleteusers(id, users.email);

    await loading.dismiss();
    this.presentToast('User information successfully deleted!');


  }


  async presentToast(message: any){
    const toast = await this.toastController.create({
      message,
      duration: 1000,
    });
    await toast.present();
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['authentication']);

  }


}

