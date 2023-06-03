import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-companyregister',
  templateUrl: './companyregister.page.html',
  styleUrls: ['./companyregister.page.scss'],
})
export class CompanyregisterPage implements OnInit {
  
  profile: any = [];
  company: any = [];

  
  constructor(
    private firestore: AdminService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { 

    this.firestore.getallcompany().subscribe(res=>{
      this.company = res;
      console.log(this.company)

    })
  }

  ngOnInit() {
  }

  view(company:any){
    const id = company.uid
    console.log(company.uid)

  
    this.router.navigate(['companyreview'], {queryParams:{uid:id}});
  }

}
