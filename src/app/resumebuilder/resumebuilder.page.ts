import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ProfilingService } from '../services/profiling.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-resumebuilder',
  templateUrl: './resumebuilder.page.html',
  styleUrls: ['./resumebuilder.page.scss'],
})
export class ResumebuilderPage implements OnInit { 
  profile: any = [];
  address: any = [];
  resume: any = [];
  certifications: any = []; 
  school: any = [];
  experience: any = [];
  pref: any = [];


  constructor(
    private firestore: ProfilingService,
    private alertCtrl: AlertController,
    private router: Router,
    private loadingCtrl: LoadingController,
  ) {
    this.firestore.getprofile().subscribe(res=>{
      this.profile = res;
      this.parse();


    })
    this.firestore.getaddress().subscribe(res=>{
      this.address = res;
      console.log(this.address)

    })

    this.firestore.getpref().subscribe(res=>{
      this.pref = res;
      this.pref = this.pref.specialization;
      console.log(this.pref)

    })
    this.firestore.getcertification().subscribe(res=>{
      this.certifications = res;

    })

    

    this.firestore.getexperience().subscribe(res=>{
      this.experience = res;

    })

    this.firestore.getschool().subscribe(res=>{
      this.school = res;

    })

    this.firestore.getresume().subscribe(res=>{
      this.resume = res;

    })
   }

  ngOnInit() {
  }

   routes(){
    this.router.navigate(['/dashboard'])
  }

  async parse(){

  
    
    if (this.profile.ea == '1'){
      this.profile.ea = 'High School Diploma';
    }else  if (this.profile.ea == '2'){
      this.profile.ea = 'Vocational Diploma/Short Course Certificate';
    }else if (this.profile.ea == '3'){
      this.profile.ea = 'Bachelors/College Degree';
    }else if (this.profile.ea == 'Post Graduate Diploma/Masters Degree'){
      this.profile.ea = 'Vocational Diploma/Short Course Certificate';
    }else if (this.profile.ea == '5'){
      this.profile.ea = 'Professional License (Passed Board/Professional/License Exams)';
    }else if (this.profile.ea == '6'){
      this.profile.ea = 'Doctorate Degree';
    }

  }


 
}
