import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-notificationuser',
  templateUrl: './notificationuser.page.html',
  styleUrls: ['./notificationuser.page.scss'],
})
export class NotificationuserPage implements OnInit {
  notifications: any = [];
  data: any = [];

  constructor(
    private app: ApplicationService
  ) { }

  ngOnInit() {
    this.app.getnotifu().subscribe(res=>{
      this.notifications = res;
      console.log(this.notifications);

      for(let i = 0;i<res.length;i++){

        if (this.notifications[i].notiftype == "enabledlisting" || this.notifications[i].notiftype == "disabledlisting"){

          this.app.getjoblist(this.notifications[i].listid).pipe(first()).subscribe(res=>{
            this.data  = res;
            this.notifications[i].listname = this.data.jtitle;
          });
  
        }
      }


      
      this.notifications.sort((a, b)=>{
        return b.timeStamp - a.timeStamp;
      });
    });
  }

}
