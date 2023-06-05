import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  notifications: any = [];
  listing: any = [];

  constructor(
    private app: ApplicationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.app.getnotif().subscribe(res=>{
      this.notifications = res;
      console.log(this.notifications);
      
      this.notifications.sort((a, b)=>{
        return b.timeStamp - a.timeStamp;
      });



      
    });
  }

  viewapply(data: any){
    console.log(data);
    this.router.navigate(['viewnotification'], {queryParams:{id: data.applyid}});
  }

}
