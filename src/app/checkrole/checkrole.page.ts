// @ts-nocheck
import { Component, OnInit } from '@angular/core';
import { ProfilingService } from '../services/profiling.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-checkrole',
  templateUrl: './checkrole.page.html',
  styleUrls: ['./checkrole.page.scss'],
})
export class CheckrolePage implements OnInit {
  storage: any = [];

  constructor(
    private profile: ProfilingService,
    private route: Router,
    private nc: NavController
  ) {

    const data =  this.profile.verify().subscribe(res =>{
      console.log(" i run again")


      this.storage = res.length;


      if(this.storage === 1){
        this.nc.navigateRoot('dashboard');
        // this.router.navigate(['dashboard']);
      }
      else if (this.storage === 0){
        const data2 = this.profile.verifyc().subscribe(res =>{
          this.storage = res.length;

          if(this.storage === 1){
            // this.router.navigate(['homecompany']);
            this.nc.navigateRoot('dashboardcompany');
          }
          data2.unsubscribe();
        });
      }
      data.unsubscribe();
    });

   }

  ngOnInit(): void {

  }

}
