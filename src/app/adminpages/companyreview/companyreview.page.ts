import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-companyreview',
  templateUrl: './companyreview.page.html',
  styleUrls: ['./companyreview.page.scss'],
})
export class CompanyreviewPage implements OnInit {
  companyc: any = [];
  company: any = [];
  employer: any = [];

  constructor(
    private firestore: AdminService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,
  ) {
    this.activatedRoute.queryParams.subscribe((params) =>{

      this.companyc = params;
      console.log(this.companyc.uid)

      this.firestore.getcompany(this.companyc.uid).subscribe(res=>{
        this.company = res;
        console.log(this.company)
  
      })
  
      this.firestore.getemployer(this.companyc.uid).subscribe(res=>{
        this.employer = res;
        console.log(this.employer)
  
      })

    })
   }

  ngOnInit() {
  }

  async accept(company){
    const id = company.uid


    const loading = await this.loadingController.create({
      message: 'Accepting Registration...',

      duration: 1000,
      spinner: 'dots',
  
    });
    await loading.present();
    await this.firestore.getaccepted(id)
    this.showAlert('Success', 'Registration Accepted!')
    this.router.navigate(['companyregister']);


  }

  async decline(company){
    const id = company.uid


    const loading = await this.loadingController.create({
      message: 'Declining Registration...',

      duration: 1000,
      spinner: 'dots',
  
    });
    await loading.present();
    await this.firestore.getdeclined(id)
    this.showAlert('Success', 'Registration Declined!')

  }

  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

}
