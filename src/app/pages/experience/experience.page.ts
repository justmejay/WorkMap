import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfilingService } from 'src/app/services/profiling.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.page.html',
  styleUrls: ['./experience.page.scss'],
})
export class ExperiencePage implements OnInit {
  experience: any = []

  constructor(private profile: ProfilingService, private router: Router) {

    this.profile.getexperience().subscribe(res=>{
      this.experience = res;
      console.log(this.experience)

    })

   }

   async edit(e: any){
    const id = e.id;
    console.log(id);

    this.router.navigate(['editexperience'], {queryParams:{cid: id}});

   }

  ngOnInit() {

  }

}
