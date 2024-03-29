import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-companyregister',
  templateUrl: './companyregister.page.html',
  styleUrls: ['./companyregister.page.scss'],
})
export class CompanyregisterPage implements OnInit {
  
  profile: any = [];
  company: any = [];
  selectTabs: any = "pending";

  
  constructor(
    private firestore: AdminService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private auth: AuthService

  ) { 

    this.firestore.getallcompany().subscribe(res=>{
      this.company = res;
      console.log(this.company)

      this.company.sort((a, b) => {
        return b.timesort - a.timesort;
      });

    })
  }

  ngOnInit() {
  }

  view(company:any){
    const id = company.uid
    console.log(company.uid)

  
    this.router.navigate(['companyreview'], {queryParams:{uid:id}});
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['authentication'], );

  }


}
