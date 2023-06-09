import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { ApplicationService } from 'src/app/services/application.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-myapplicationsjob',
  templateUrl: './myapplicationsjob.page.html',
  styleUrls: ['./myapplicationsjob.page.scss'],
})
export class MyapplicationsjobPage implements OnInit {

  appl: any = [];
  job: any = [];
  

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

      this.appl = params;
      console.log(this.appl.jobid)

      this.app.getjobid(this.appl.jobid).subscribe(res=>{
        this.job = res;
        console.log(this.job)
  
        
  
      })
  
      })
  }

  ngOnInit() {
  }

}
