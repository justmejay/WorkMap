import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { ApplicationService } from 'src/app/services/application.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ToastController} from '@ionic/angular';
import { ProfilingService } from 'src/app/services/profiling.service';
import { GmapService } from 'src/app/services/gmap.service';

@Component({
  selector: 'app-myapplications',
  templateUrl: './myapplications.page.html',
  styleUrls: ['./myapplications.page.scss'],
})
export class MyapplicationsPage implements OnInit {

  jobs: any = [];
  profiles: any = [];
  appl: any = [];


  selectTabs: any = "pending";

  constructor(
    private firestore: CompanyService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,
    private app: ApplicationService,
    private profile: ProfilingService,
    private maps: GmapService
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





 

  view(appl:any){
    const id = appl.application.jobid
    console.log(appl.application.jobid)

  
    this.router.navigate(['myapplicationsjob'], {queryParams:{jobid:id, applid: appl.userget}});
  }

}
