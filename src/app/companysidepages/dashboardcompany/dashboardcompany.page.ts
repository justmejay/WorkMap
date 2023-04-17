import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-dashboardcompany',
  templateUrl: './dashboardcompany.page.html',
  styleUrls: ['./dashboardcompany.page.scss'],
})
export class DashboardcompanyPage implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  
  logout(){
    this.auth.logout();
    this.router.navigate(['authentication'], );

    
  }

}
