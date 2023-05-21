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
  earray: any =[];
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


    // this.profile.verifyschool().then(res =>{
    //   const a = res;


    //       this.profile.verifyresume().then(res =>{
    //         const d = res;


    //         this.profile.verifyrfile().then(res =>{
    //           const e = res;
             
                
    //           if (a >= 1  && d>=1 && e>=1 ){
              
    //             this.button = false;

    //             this.profile.getprofilepref().subscribe(res =>{

    //               this.userarray = res;
    //               this.userspec = this.userarray.specialization;
          
    //               this.profile.getprofile().subscribe(res =>{
          
    //                 this.earray = res;
          
    //                 this.earray = this.earray.ea;
    //                 console.log(this.earray)
          
    //                 this.firestore.getjobs(this.userspec, this.earray).subscribe(res=>{
          
    //                 this.job = res;
    //                 this.job.sort((a, b) => {
    //                     return b.timesort - a.timesort;
    //                   });
    //                   console.log(this.job);
             
    //                 });
            
          
          
    //               });
          
          
                 
          
          
          
    //             });
          

    //           }else{
    //             this.button  = true;
    //           }



    //         });


            

    //       });


  

      


    // });

      
     

     
   }

  async ngOnInit() {
 
   

    const loading = await this.loadingController.create({
      message:'Validating',
      spinner: 'dots'
    });

    await loading.present();

    await this.profile.verifyschool().then(res =>{
      const a = res;


          this.profile.verifyresume().then(res =>{
            const d = res;


            this.profile.verifyrfile().then(res =>{
              const e = res;
             
                
              if (a >= 1  && d>=1 && e>=1 ){
              
                this.button = false;

                this.profile.getprofilepref().subscribe(res =>{

                  this.userarray = res;
                  this.userspec = this.userarray.specialization;
          
                  this.profile.getprofile().subscribe(res =>{
          
                    this.earray = res;
          
                    this.earray = this.earray.ea;
                    console.log(this.earray)
          
                    this.firestore.getjobs(this.userspec, this.earray).subscribe(res=>{
          
                    this.job = res;
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
                      console.log(this.job);
             
                    });
            
          
          
                  });
          
          
                 
          
          
          
                });
          

              }else{
                this.button  = true;
              }



            });


            

          });


  

      


    });

      

    await loading.dismiss();




   

    



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
    this.job = [];
    this.profile.verifyschool().then(res =>{
      const a = res;

          this.profile.verifyresume().then(res =>{
            const d = res;


            this.profile.verifyrfile().then(res =>{
              const e = res;
             
                
              if (a >= 1 && d>=1 && e>=1 ){
              
                this.button = false;
                this.profile.getprofilepref().subscribe(res =>{

                  this.userarray = res;
                  this.userspec = this.userarray.specialization;
          
                  this.profile.getprofile().subscribe(res =>{
          
                    this.earray = res;
          
                    this.earray = this.earray.ea;
                    console.log(this.earray)
          
                    this.firestore.getjobs(this.userspec, this.earray).subscribe(res=>{
          
                    this.job = res;
                    this.job.sort((a, b) => {
                        return b.timesort - a.timesort;
                      });
                      console.log(this.job);
             
                    });
            
          
          
                  });
          
          
                 
          
          
          
                }); 

              }else{
                this.button  = true;
              }



            });


            

          });

 

      


    });
  }




}
