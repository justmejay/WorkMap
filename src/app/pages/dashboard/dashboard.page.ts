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
import { GmapService } from 'src/app/services/gmap.service';
import { ApplicationService } from 'src/app/services/application.service';
import { timer } from 'rxjs';

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
  fpdata: any = [];
  fcdata: any = [];
  distancestorage: any = [];
  term: any = "recent";

  profiles: any = [];
  initusub: any;
  sortedarray: any = []; 
  

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
    private profile: ProfilingService,
    private maps: GmapService,
    private app: ApplicationService,
  ) {

    this.profile.getprofile().subscribe(res => {
      this.profiles = res;
      console.log(this.profiles);
    });

    this.filter();
     

     
   }

  async ngOnInit() {
 


    



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

  posts(profiles:any){
    const id = profiles.uid

  
    this.router.navigate(['mypostuser'], {queryParams:{usid:id,}});
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
          
                    console.log(this.earray)
          
                    this.firestore.getjobs(this.userspec, this.earray.ea).subscribe(res=>{
          
                    this.job = res;
                    
                   
                      console.log(this.job);
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

  gocdata(data: any){
    console.log(data);

    this.router.navigate(['aboutcompany'], {queryParams:{id: data.uid}});

  }

  computedistance(uid: any){
    
  }

  async filter(){
    
      const loading = await this.loadingController.create({
        message:'Validating',
        spinner: 'dots'
      });
  
      await loading.present();

  
      await this.profile.verifyschool().then(async res =>{
        const a = res;
  
  
          await  this.profile.verifyresume().then(async res =>{
              const d = res;
  
  
              await this.profile.verifyrfile().then(async res =>{
                const e = res;
               
                  
                if (a >= 1  && d>=1 && e>=1 ){
                
                  this.button = false;
  
                   this.profile.getprofilepref().subscribe(res =>{
  
                    this.userarray = res;
                    this.userspec = this.userarray.specialization;
            
                    this.profile.getprofile().subscribe(async res =>{
            
                      this.earray = res;
            
                      this.earray = this.earray.ea;
                      console.log(this.earray)
            
                  this.firestore.getjobs(this.userspec, this.earray).subscribe(async res=>{
  
  
            
                      this.job = res;
                    
                   
                     
                      
  
                        for (let i=0; i< res.length; i++){
                      
                            this.profile.getcoords().subscribe(res=>{
                              this.fpdata = res;
                              console.log(this.fpdata)
                      
                              this.maps.distancecompute(this.job[i].lat,this.job[i].lng, this.fpdata.clat, this.fpdata.clng).subscribe(res=>{
                                  console.log(res);
                                this.job[i].distance = res.rows[0].elements[0].distance.text;
                                this.job[i].distancesort = res.rows[0].elements[0].distance.value;


                            if(this.term == "recent"){
                              timer(100).subscribe(x => { 
                                this.job.sort((a, b) => {
                                  
                               return b.timesort - b.timesort;
                                });                    
                              });

                            }else if( this.term == "distance"){
                              timer(100).subscribe(x => { 
                                this.job.sort((a, b) => {
                                  
                               return a.distancesort - b.distancesort;
                                });                    
                              });

                            }
                        
                        console.log(this.job);



                      
                              });
                      
                            });
  
  
            
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

                      const test = this.job;
                      


                        
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
 


}
