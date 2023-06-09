import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { ApplicationService } from 'src/app/services/application.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-myapplications',
  templateUrl: './myapplications.page.html',
  styleUrls: ['./myapplications.page.scss'],
})
export class MyapplicationsPage implements OnInit {

  jobs: any = [];
  profiles: any = [];
  appl: any = [];

  constructor(
    private firestore: CompanyService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,
    private app: ApplicationService,
  ) {

    // this.activatedRoute.queryParams.subscribe((params) =>{

      // this.profiles = params;
      // console.log(this.profiles.uid)

      this.app.getappid().subscribe(res=>{
      this.appl = res;
      console.log(this.appl)

      

    })

    // })

    

    
   }

  ngOnInit() {
  }

}
