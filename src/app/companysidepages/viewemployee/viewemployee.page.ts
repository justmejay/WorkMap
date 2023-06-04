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

}
