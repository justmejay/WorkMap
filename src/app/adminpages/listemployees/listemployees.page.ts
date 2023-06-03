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
  count: any;
  employerdata: any = [];
  employerdetails: any = [];


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
      console.log(res)

      for(let v=0;v<res.length;v++){
        this.employerdata = [];

        this.firestore.getallemployersd(this.employers[v].userget).subscribe(res=>{
          this.employerdetails.push(res);
          console.log(this.employerdetails);
        });

      }

    });

    this.firestore.getallcompany().subscribe(res=>{
      this.count = res.length;
    });
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
    await this.firestore.deleteemployers(id,employers.email);

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
