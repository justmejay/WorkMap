import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { CompanyService } from 'src/app/services/company.service'; 
import {
  getDownloadURL,
  ref,
  Storage,
  uploadString,
  uploadBytes,
  deleteObject
} from '@angular/fire/storage';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-dashboardcompany',
  templateUrl: './dashboardcompany.page.html',
  styleUrls: ['./dashboardcompany.page.scss'],
})
export class DashboardcompanyPage implements OnInit {
  job: any = [];
  dateposted: any;
  company: any = [];

  constructor(
    private firestore: CompanyService,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private auth: AuthService,
    private router: Router,
    private storage: Storage,
    private authd: Auth
  ) {

      
    this.firestore.getcompany().subscribe(res=>{
      this.job = res;
      console.log(this.job)
      this.company = res;


    })
    
    this.firestore.getjobc().subscribe(res=>{
      this.job = res;
      console.log(this.job)


    })
   }

  ngOnInit() {
  }

  
  logout(){
    this.auth.logout();
    this.router.navigate(['authentication'], );

    
  }

}
