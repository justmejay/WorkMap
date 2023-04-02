import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfilingService } from 'src/app/services/profiling.service';

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.page.html',
  styleUrls: ['./certifications.page.scss'],
})
export class CertificationsPage implements OnInit {
  certification: any=[];


  constructor(
    private profile: ProfilingService,
    private router: Router,
  ) {
    
    this.profile.getcertification().subscribe(res=>{
      this.certification = res;
      console.log(this.certification)

    })

   }

  ngOnInit() {
  }

  async editcert(e: any){

    const id = e.id;
    this.router.navigate(['/editcertifications'], {queryParams:{cid: id}});

  }

}
