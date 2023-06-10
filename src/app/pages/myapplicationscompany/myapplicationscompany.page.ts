import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { ApplicationService } from 'src/app/services/application.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-myapplicationscompany',
  templateUrl: './myapplicationscompany.page.html',
  styleUrls: ['./myapplicationscompany.page.scss'],
})
export class MyapplicationscompanyPage implements OnInit {

  job: any = [];
  cdetails: any = [];

  constructor(
    private firestore: CompanyService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,
    private app: ApplicationService,
  ) { 

    this.activatedRoute.queryParams.subscribe((params) =>{

      this.job = params;
      console.log(this.job.uid)

      this.app.getcompanyid(this.job.uid).subscribe(res=>{
        this.cdetails = res;
        console.log(this.cdetails)
        
  
  
        
  
      })
  
      })
  }

  ngOnInit() {
  }
  
  

}
