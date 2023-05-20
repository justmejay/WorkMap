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
  isCheck: boolean;

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

      this.company = res;


    });
    
    this.firestore.getjobc().subscribe(res=>{
      this.job = res;
      console.log(res.length);

      this.job.sort((a, b) => {
        return b.timesort - a.timesort;
      });

   
        for (var i=0; i< res.length; i++){
          
          if (this.job[i].attainment == '0'){
          this.job[i].attainment = 'No Minimum Education Required';
          }else if (this.job[i].attainment == '1'){
            this.job[i].attainment = 'High School Diploma';
          }else  if (this.job[i].attainment == '2'){
            this.job[i].attainment = 'Vocational Diploma/Short Course Certificate';
          }else if (this.job[i].attainment == '3'){
            this.job[i].attainment = 'Bachelors/College Degree';
          }else if (this.job[i].attainment == 'Post Graduate Diploma/Masters Degree'){
            this.job[i].attainment = 'Vocational Diploma/Short Course Certificate';
          }else if (this.job[i].attainment == '5'){
            this.job[i].attainment = 'Professional License (Passed Board/Professional/License Exams)';
          }else if (this.job[i].attainment == '6'){
            this.job[i].attainment = 'Doctorate Degree';
          }
      
  
  
        
      }

    


    })
   }

  ngOnInit() {
  }

  
  logout(){
    this.auth.logout();
    this.router.navigate(['authentication'], );

    
  }

  async checked(event: any, job: any){
    const a = event.currentTarget.checked;
    const b = job.listid;
    const user = await this.firestore.editstatus(b, a);
  }

  applicant(job:any){
    const any = job.listid
  
    this.router.navigate(['applicantlist'], {queryParams:{jobid:any}});
  }

  edit(job:any){
    const any = job.listid

    this.router.navigate(['editjoblist'], {queryParams:{jobid:any}});


  }


  async parse(){

  
    if (this.job.attainment == '1'){
      this.job.attainment = 'High School Diploma';
    }else  if (this.job.attainment == '2'){
      this.job.attainment = 'Vocational Diploma/Short Course Certificate';
    }else if (this.job.attainment == '3'){
      this.job.attainment = 'Bachelors/College Degree';
    }else if (this.job.attainment == 'Post Graduate Diploma/Masters Degree'){
      this.job.attainment = 'Vocational Diploma/Short Course Certificate';
    }else if (this.job.attainment == '5'){
      this.job.attainment = 'Professional License (Passed Board/Professional/License Exams)';
    }else if (this.job.attainment == '6'){
      this.job.attainment = 'Doctorate Degree';
    }

  }

}
