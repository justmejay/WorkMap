import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../services/company.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messagespage',
  templateUrl: './messagespage.page.html',
  styleUrls: ['./messagespage.page.scss'],
})
export class MessagespagePage implements OnInit {
inbox: any = [];
  constructor(
    private company: CompanyService, 
    private router: Router
  ) {

    this.company.getinbox().subscribe(res=>{
      this.inbox = res;
      console.log(this.inbox)
    });

   }

  ngOnInit() {
  }


  view(data){
    this.router.navigate(['messageview'], {queryParams:{id: data.cid}});

  }

}
