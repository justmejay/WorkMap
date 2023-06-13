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
  finalbook: any = [];
  verdict: boolean = false;
  countmsg: any;
  countnotif: any;
  

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

    
    this.firestore.getinbox().subscribe(res=>{
      this.countmsg = res.length; 
    });

    this.app.getnotifu().subscribe(res=>{
      this.countnotif = res.length;
    });

    this.profile.getprofile().subscribe(res => {
      this.profiles = res;
      console.log(this.profiles);
    });

    this.filter();
     

     
   }

  async ngOnInit() {
 


    



  }

  ionViewDidEnter(){
    this.finalbook = [];
    this.filter;
  }

  logout(){
    this.auth.logout();
    this.nc.navigateRoot('authentication');
  }

  apply(job:any){
    const any = job.listid
    const id = job.uid
    const title = job.jtitle

  
    this.router.navigate(['applytojob'], {queryParams:{jobid:any, cid:id, jtitle: title}});
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
          
                    this.firestore.getjobs(this.userspec, this.earray.ea, this.userarray.exp).subscribe(res=>{
          
                    this.job = res;
                    
                      console.log(this.job[0].exception.length);

                      // for (var i = 0;i<res.length;i++){

                      //  for 

                      // }
             
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
            
                      this.earray = this.earray;
                      console.log(this.earray)
            
                    this.firestore.getjobs(this.userspec, this.earray.ea, this.userarray.exp).subscribe(async res=>{
                      this.finalbook = [];
                      this.job = res;
                      console.log(this.job);

                      for (let i = 0;i<res.length;i++){

                       if(this.job[i].exception.length == 0){
                        if (this.job[i].jexperience <= this.userarray.exp){
                          this.finalbook.push(this.job[i]);

                        }
                       }else{
                        this.verdict = false;
                        for (let j = 0; j<this.job[i].exception.length ; j++){
                          console.log(this.job[i].exception[j]);
                          console.log(this.earray)
  
                            if (this.job[i].exception[j] == this.earray.uid){
                              this.verdict = true;
                            }
  
                           
                       }
                       if (this.verdict == false){
                        if (this.job[i].jexperience <= this.userarray.exp){
                          this.finalbook.push(this.job[i]);

                        }
                      }
                   }

                      }
                   
                      console.log(this.finalbook)



                        for (let i=0; i< this.finalbook.length; i++){
                      
                            this.profile.getcoords().subscribe(res=>{
                              this.fpdata = res;
                              console.log(this.fpdata)
                      
                              this.maps.distancecompute(this.finalbook[i].lat,this.finalbook[i].lng, this.fpdata.clat, this.fpdata.clng).subscribe(res=>{
                                  console.log(res);
                                this.finalbook[i].distance = res.rows[0].elements[0].distance.text;
                                this.finalbook[i].distancesort = res.rows[0].elements[0].distance.value;


                            if(this.term == "recent"){
                              timer(100).subscribe(x => { 
                                this.finalbook.sort((a, b) => {
                                  
                               return b.timesort - b.timesort;
                                });                    
                              });

                            }else if( this.term == "distance"){
                              timer(100).subscribe(x => { 
                                this.finalbook.sort((a, b) => {
                                  
                               return a.distancesort - b.distancesort;
                                });                    
                              });

                            }
                        
                        console.log(this.finalbook);



                      
                              });
                      
                            });
  
  
            
                          if (this.finalbook[i].attainment == '0'){
                          this.finalbook[i].attainment = 'No Minimum Education Required';
                          }else if (this.finalbook[i].attainment == '1'){
                            this.finalbook[i].attainment = 'High School Diploma';
                          }else  if (this.finalbook[i].attainment == '2'){
                            this.finalbook[i].attainment = 'Vocational Diploma/Short Course Certificate';
                          }else if (this.finalbook[i].attainment == '3'){
                            this.finalbook[i].attainment = 'Bachelors/College Degree';
                          }else if (this.finalbook[i].attainment == 'Post Graduate Diploma/Masters Degree'){
                            this.finalbook[i].attainment = 'Vocational Diploma/Short Course Certificate';
                          }else if (this.finalbook[i].attainment == '5'){
                            this.finalbook[i].attainment = 'Professional License (Passed Board/Professional/License Exams)';
                          }else if (this.finalbook[i].attainment == '6'){
                            this.finalbook[i].attainment = 'Doctorate Degree';
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
