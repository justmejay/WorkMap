import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ProfilingService } from 'src/app/services/profiling.service';

@Component({
  selector: 'app-editschool',
  templateUrl: './editschool.page.html',
  styleUrls: ['./editschool.page.scss'],
})
export class EditschoolPage implements OnInit {
  sch: any = [];
  schoold: any;
  credentials: FormGroup;

  get schoolname() {
    return this.credentials.get('schoolname');
  }
  get level() {
    return this.credentials.get('level');
  }
  get course() {
    return this.credentials.get('course');
  }
  get yearg() {
    return this.credentials.get('yearg');
  }
 
  constructor(
    private activatedRoute: ActivatedRoute,
    private firestore: ProfilingService,
    private profile:  ProfilingService,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router

  ) {
    this.activatedRoute.queryParams.subscribe((params) =>{
      this.schoold = params['cid'];
      console.log(this.schoold)

      this.firestore.getscbyID(this.schoold).subscribe(res => {
        this.sch = res;
        console.log(this.sch);
      });


      });
   }

  ngOnInit() {
    this.credentials = this.fb.group({
      schoolname: ['', [Validators.required]],
      level: ['', [Validators.required]],
      course: ['', [Validators.required]],
      yearg: ['', [Validators.required]],
    });
  }


  async editsc() {

    const loading = await this.loadingController.create({
      spinner: "dots",
      message: "Adding up!"
    });    await loading.present();

    const user = await this.firestore.editschool(this.credentials.value,this.schoold);
    await loading.dismiss();

    if (user) {
      this.router.navigateByUrl('/school', { replaceUrl: true });
      this.showAlert('Edit success', 'Data updated!');


        } else {
      this.showAlert('Edit failed', 'Please try again!');
    }
  }



  async showAlert(header: any, message: any) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

}
