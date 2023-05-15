import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
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
import { Profiler } from 'inspector';
import { ProfilingService } from 'src/app/services/profiling.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  job: any = [];
  vschool: any;
  button: boolean = true;
  userarray: any = [];
  userspec: any;

  constructor(
    private firestore: CompanyService,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private auth: AuthService,
    private router: Router,
    private storage: Storage,
    private authd: Auth,
    private nc: NavController,
    private profile: ProfilingService
  ) {

      this.profile.getprofile().subscribe(res =>{

        this.userarray = res;
        this.userspec = this.userarray.specialization;

        this.firestore.getjobs(this.userspec).subscribe(res=>{


          this.job = res;
          console.log(this.job)
        });




      });

     

     this.profile.verifyschool().then(res =>{
      const a = res;

      this.profile.verifyexp().then(res =>{
        const b = res;


        this.profile.verifycertifications().then(res =>{

          const c = res;

          this.profile.verifyresume().then(res =>{
            const d = res;


            this.profile.verifyrfile().then(res =>{
              const e = res;
             
                
              if (a >= 1 && b >= 1 && c>=1 && d>=1 && e>=1 ){
              
                this.button = false;

              }else{
                this.button  = true;
              }



            });


            

          });

        });
      });

      


    });

    
     
   }

  ngOnInit() {
  }

  logout(){
    this.auth.logout();
    this.nc.navigateRoot('authentication');
  }

  apply(job:any){
    const any = job.listid
    const id = job.uid

  
    this.router.navigate(['applytojob'], {queryParams:{jobid:any, cid:id}});
  }

  async revalidated(){
    this.profile.verifyschool().then(res =>{
      const a = res;

      this.profile.verifyexp().then(res =>{
        const b = res;


        this.profile.verifycertifications().then(res =>{

          const c = res;

          this.profile.verifyresume().then(res =>{
            const d = res;


            this.profile.verifyrfile().then(res =>{
              const e = res;
             
                
              if (a >= 1 && b >= 1 && c>=1 && d>=1 && e>=1 ){
              
                this.button = false;

              }else{
                this.button  = true;
              }



            });


            

          });

        });
      });

      


    });
  }


  handleRefresh(event) {
    setTimeout(() => {
      this.revalidated();
      event.target.complete();
    }, 2000);
  }

}
