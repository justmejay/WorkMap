import { Component, OnInit } from '@angular/core';
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
  ) {

    this.firestore.getprofile().subscribe(res=>{
      this.profile = res;

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

}
