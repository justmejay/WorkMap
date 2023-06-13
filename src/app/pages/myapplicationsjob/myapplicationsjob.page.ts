import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { ApplicationService } from 'src/app/services/application.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ToastController} from '@ionic/angular';
import { first } from 'rxjs';

@Component({
  selector: 'app-myapplicationsjob',
  templateUrl: './myapplicationsjob.page.html',
  styleUrls: ['./myapplicationsjob.page.scss'],
})
export class MyapplicationsjobPage implements OnInit {

  appl: any = [];
  job: any = [];
  data: any = [];
  

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
        console.log(this.job);
      })

      this.app.getappbyid(this.appl.applid).pipe(first()).subscribe(res=>{
        this.data   = res;

      });
  
      })
  }

  ngOnInit() {
  }

  view(job:any){
    const id = job.uid
    console.log(job.uid)

  
    this.router.navigate(['myapplicationscompany'], {queryParams:{uid:id, jobid: this.appl.jobid }});
  }

  async reapply(job){
    console.log(job)
    if (job.slots <1){
      const toast = await this.toastController.create({
        message: 'Cannot reapply! Vacancies are not available in the moment!',
        duration: 1000
      });

      await toast.present();

    }else{

      console.log(this.appl.applid);

        const user = this.firestore.reapply(this.appl.applid);

        if (user){
          const toast = await this.toastController.create({
            message: 'Reapplied Successfully!',
            duration: 1000
          });
    
          await toast.present();
          this.router.navigate(['myapplications']);

        }else{
          const toast = await this.toastController.create({
            message: 'Something went wrong!',
            duration: 1000
          });
    
          await toast.present();
        }


        
    }
  }

}
