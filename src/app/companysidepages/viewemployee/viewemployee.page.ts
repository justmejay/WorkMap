import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/services/application.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-viewemployee',
  templateUrl: './viewemployee.page.html',
  styleUrls: ['./viewemployee.page.scss'],
})
export class ViewemployeePage implements OnInit {

  app: any = [];
  appl: any = [];
  rates: any = [];
  ratescount: any;

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

      this.firestore.getrating(this.app.appid, this.app.comid).subscribe(res=>{
        this.rates = res;
        this.ratescount = res.length;
        this.rates = this.rates[0];
        console.log(this.rates)
  
      })

    })
  }

  ngOnInit() {
  }

  view(app:any){
    const id = app.application.uid

  
    this.router.navigate(['viewemployee'], {queryParams:{appid:id,}});
  }


  back(){

    this.router.navigate(['employees'], {queryParams:{comid: this.app.comid}});

    
  }

  rate(){
    this.router.navigate(['rateemployee'], {queryParams:{appid:this.app.appid, comid: this.app.comid}});

  }

  rate2(){
    this.router.navigate(['rateemployeeedit'], {queryParams:{appid:this.app.appid, comid: this.app.comid}});

  }

}
