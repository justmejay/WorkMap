import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-notificationuser',
  templateUrl: './notificationuser.page.html',
  styleUrls: ['./notificationuser.page.scss'],
})
export class NotificationuserPage implements OnInit {
  notifications: any = [];

  constructor(
    private app: ApplicationService
  ) { }

  ngOnInit() {
    this.app.getnotifu().subscribe(res=>{
      this.notifications = res;
      console.log(this.notifications);
      
      this.notifications.sort((a, b)=>{
        return b.timeStamp - a.timeStamp;
      });
    });
  }

}
