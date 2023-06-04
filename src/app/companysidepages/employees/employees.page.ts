import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/services/application.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.page.html',
  styleUrls: ['./employees.page.scss'],
})
export class EmployeesPage implements OnInit {

  company: any = [];
  app: any = [];

  constructor(
    private firestore: ApplicationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,
  ) {

    this.activatedRoute.queryParams.subscribe((params) =>{

      this.company = params;
      console.log(this.company.comid)

      this.firestore.getallapply(this.company.comid).subscribe(res=>{
        this.app = res;
        console.log(this.app)
  
      })

    })
   }

  ngOnInit() {
  }

  view(app:any){
    const id = app.application.uid

  
    this.router.navigate(['viewemployee'], {queryParams:{appid:id,}});
  }

}
