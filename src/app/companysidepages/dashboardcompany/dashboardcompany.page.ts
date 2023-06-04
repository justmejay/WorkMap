import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
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
import { ApplicationService } from 'src/app/services/application.service';

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
  notifcount: any;

  employer: any = [];

  button: boolean = true;

  companyid: any = [];

  constructor(
    private firestore: CompanyService,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private auth: AuthService,
    private router: Router,
    private storage: Storage,
    private authd: Auth,
    private app: ApplicationService,
    private toastController: ToastController,
  ) {

    this.firestore.getemployer().subscribe(res=>{

      this.employer = res;


    });

    this.app.getnotif().subscribe(res=>{

      this.notifcount = res.length;


    });


      
    this.firestore.getcompany().subscribe(res=>{

      this.company = res;
      console.log(this.company.uid)
      console.log(this.company.status)

      if (this.company.status == 'Pending') {
        this.button = true;
      } else if (this.company.status == 'Declined') {
        this.button = true;
      } else {
        this.button = false;
      }


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
    console.log(a)
    console.log(b)
    const user = await this.firestore.editstatus(b, a);
  }

  applicant(job:any){
    const any = job.listid
  
    this.router.navigate(['applicantlist'], {queryParams:{jobid:any}});
  }

  posts(employer:any){
    const id = employer.uid

  
    this.router.navigate(['mypostcompany'], {queryParams:{usid:id,}});
  }

  edit(job:any){
    const any = job.listid

    this.router.navigate(['editjoblist'], {queryParams:{jobid:any}});


  }


  async delete(job: any){
    const loading = await this.loadingController.create({
      spinner: "dots",
      message: "Deleting up!"
    });    await loading.present();

    const id = job.listid;
    await this.firestore.deletejob(id);

    await loading.dismiss();
    this.presentToast('Job listing successfully deleted!');


  }

  async presentToast(message: any){
    const toast = await this.toastController.create({
      message,
      duration: 1000,
    });
    await toast.present();
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
