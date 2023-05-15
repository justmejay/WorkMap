import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ProfilingService } from 'src/app/services/profiling.service';

@Component({
  selector: 'app-applicantprofile',
  templateUrl: './applicantprofile.page.html',
  styleUrls: ['./applicantprofile.page.scss'],
})
export class ApplicantprofilePage implements OnInit {
  profile: any = [];
  address: any = [];
  resume: any = [];
  certifications: any = []; 
  school: any = [];
  experience: any = [];
 


  constructor(
    private firestore: ProfilingService,
    private alertCtrl: AlertController,
    private router: Router
  ) {

    this.firestore.getprofile().subscribe(res=>{
      this.profile = res;
      this.parse();

    })
    this.firestore.getaddress().subscribe(res=>{
      this.address = res;
      console.log(this.address)

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




   }

  ngOnInit(
    

  ) {

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
