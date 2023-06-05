import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/services/application.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-rateemployee',
  templateUrl: './rateemployee.page.html',
  styleUrls: ['./rateemployee.page.scss'],
})
export class RateemployeePage implements OnInit {

  app: any = [];
  appl: any =[];
  cs: any;
  wq: any;
  pr:any;
  ts: any;
  co: any;


 

  constructor(
    private firestore: ApplicationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,
  ) {
    this.activatedRoute.queryParams.subscribe((params) =>{

      this.app = params;
      console.log(this.app.appid)

      this.firestore.getallprof(this.app.appid).subscribe(res=>{
        this.appl = res;
        console.log(this.appl)
  
      })

    })
   }

  ngOnInit() {
  }

  back(){
    
      this.router.navigate(['viewemployee'], {queryParams:{appid:this.app.appid, comid: this.app.comid}});
  
    
  }

  rate(){

    this.firestore.rate(this.app.appid, this.app.comid,this.cs,this.wq,this.ts,this.pr,this.co)

    this.showAlert('Rate success', '');
    this.back();


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
