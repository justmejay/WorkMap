import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-viewemployerprofile',
  templateUrl: './viewemployerprofile.page.html',
  styleUrls: ['./viewemployerprofile.page.scss'],
})
export class ViewemployerprofilePage implements OnInit {

  employers: any = [];
  company: any = [];
  employer: any =  [];

  appl: any = [];
  count: any;

  constructor(
    private firestore: AdminService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,
  ) {
    this.activatedRoute.queryParams.subscribe((params) =>{

      this.employers = params;
      console.log(this.employers.uid)

      
      this.firestore.getcompany(this.employers.uid).subscribe(res=>{
        this.company = res;
        console.log(this.company)
  
      })
  
      this.firestore.getemployer(this.employers.uid).subscribe(res=>{
        this.employer = res;
        console.log(this.employer)
  
      })

      this.firestore.getcomapp(this.employers.uid).subscribe(res=>{
        this.appl = res;
        this.count = res.length;
        console.log(this.count)
  
      })

      

    })
   }

  ngOnInit() {
  }

  async archive(employer){
    const id = employer.uid


    const loading = await this.loadingController.create({
      message: 'Archiving Account...',

      duration: 1000,
      spinner: 'dots',
  
    });
    await loading.present();
    await this.firestore.getarchived(id)

    this.router.navigate(['/listemployees'])
    .then(async () => {
      const loading = await this.loadingController.create({
        message: 'Validating',
        spinner: 'dots',
      });
      await loading.present();
  
      window.location.reload();
  
      await loading.dismiss();
  
  
    });


  }

  async reactivate(employer){
    const id = employer.uid


    const loading = await this.loadingController.create({
      message: 'Reactivating Account...',

      duration: 1000,
      spinner: 'dots',
  
    });
    await loading.present();
    await this.firestore.getreactivated(id)
    this.router.navigate(['/listemployees'])
    .then(async () => {
      const loading = await this.loadingController.create({
        message: 'Validating',
        spinner: 'dots',
      });
      await loading.present();
  
      window.location.reload();
  
      await loading.dismiss();
  
  
    });

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
