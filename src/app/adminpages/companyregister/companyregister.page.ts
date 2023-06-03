import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

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
  ) { 
    this.firestore.getallprofile().subscribe(res=>{
      this.profile = res;
      console.log(this.profile)

    })

    this.firestore.getallcompany().subscribe(res=>{
      this.company = res;
      console.log(this.company)

    })
  }

  ngOnInit() {
  }

}
