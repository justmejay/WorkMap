import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ApplicationService } from 'src/app/services/application.service'; 
import {
  getDownloadURL,
  ref,
  Storage,
  uploadString,
  uploadBytes,
  deleteObject
} from '@angular/fire/storage';
import { Auth } from '@angular/fire/auth';


@Component({
  selector: 'app-viewnotification',
  templateUrl: './viewnotification.page.html',
  styleUrls: ['./viewnotification.page.scss'],
})
export class ViewnotificationPage implements OnInit {

  jobs: any = [];

  profile: any = [];

  address: any = [];

  constructor(
    private firestore: ApplicationService,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private auth: AuthService,
    private router: Router,
    private storage: Storage,
    private authd: Auth,
    private activatedRoute: ActivatedRoute,
  ) { 
    this.activatedRoute.queryParams.subscribe((params) =>{

      this.jobs = params;
      console.log(this.jobs.usid)

      this.firestore.getprofiles(this.jobs.usid).subscribe(res => {
        this.profile = res;
        console.log(this.profile);
      });

      this.firestore.getaddresss(this.jobs.usid).subscribe(res => {
        this.address = res;
        console.log(this.address);
      });
  })
}

  ngOnInit() {
  }

}
