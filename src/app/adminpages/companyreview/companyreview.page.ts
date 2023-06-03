import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-companyreview',
  templateUrl: './companyreview.page.html',
  styleUrls: ['./companyreview.page.scss'],
})
export class CompanyreviewPage implements OnInit {
  company: any = [];

  constructor(
    private firestore: AdminService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.queryParams.subscribe((params) =>{

      this.company = params;
      console.log(this.company.uid)

    })
   }

  ngOnInit() {
  }

}
