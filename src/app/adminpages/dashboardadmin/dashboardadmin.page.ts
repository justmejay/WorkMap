import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-dashboardadmin',
  templateUrl: './dashboardadmin.page.html',
  styleUrls: ['./dashboardadmin.page.scss'],
})
export class DashboardadminPage implements OnInit {

  users: any = [];

  constructor(
    private firestore: AdminService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.firestore.getallusers().subscribe(res=>{
      this.users = res;
      console.log(this.users)

    })
   }

  ngOnInit() {
  }

  view(users:any){
    const id = users.uid
    console.log(users.uid)

  
    this.router.navigate(['viewuserproile'], {queryParams:{uid:id}});
  }

}
