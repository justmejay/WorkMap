import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-messagescompany',
  templateUrl: './messagescompany.page.html',
  styleUrls: ['./messagescompany.page.scss'],
})
export class MessagescompanyPage implements OnInit {

  inbox: any = [];
  constructor(
    private company: CompanyService,
    private router: Router
  ) {
    this.company.getinboxc().subscribe(res=>{
      this.inbox = res;
      console.log(this.inbox)
    });

   }

  ngOnInit() {
  }

  view(data){
    this.router.navigate(['messageviewcompany'], {queryParams:{id: data.uid, cid: data.cid}});

  }

}
