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

      

    })
   }

  ngOnInit() {
  }

}
