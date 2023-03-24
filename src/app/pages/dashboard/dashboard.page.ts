import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

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
