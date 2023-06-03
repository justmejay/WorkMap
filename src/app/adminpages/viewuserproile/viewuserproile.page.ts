import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-viewuserproile',
  templateUrl: './viewuserproile.page.html',
  styleUrls: ['./viewuserproile.page.scss'],
})
export class ViewuserproilePage implements OnInit {

  users: any = [];
  profile: any = [];
  address: any = [];

  constructor(
    private firestore: AdminService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,
  ) {
    this.activatedRoute.queryParams.subscribe((params) =>{

      this.users = params;
      console.log(this.users.uid)

      this.firestore.getprofile(this.users.uid).subscribe(res=>{
        this.profile = res;
        // this.parse();
  
      })
      this.firestore.getaddress(this.users.uid).subscribe(res=>{
        this.address = res;
        console.log(this.address)
  
      })

    })
   }

  ngOnInit() {
  }

}
