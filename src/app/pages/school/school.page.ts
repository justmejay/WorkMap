import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfilingService } from 'src/app/services/profiling.service';

@Component({
  selector: 'app-school',
  templateUrl: './school.page.html',
  styleUrls: ['./school.page.scss'],
})
export class SchoolPage implements OnInit {
  school: any=[];


  constructor(
    private profile: ProfilingService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 




    this.profile.getschool().subscribe(res=>{
      this.school = res;

    })

  }

  ngOnInit() {
  }

  async editsc(e: any){

    const id = e.id;

    this.router.navigate(['editschool'], {queryParams:{cid: id}});


  }

}
