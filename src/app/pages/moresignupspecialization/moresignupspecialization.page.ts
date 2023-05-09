import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { GmapService } from 'src/app/services/gmap.service';
import { Geolocation } from '@capacitor/geolocation';
import { ProfilingService } from 'src/app/services/profiling.service';

@Component({
  selector: 'app-moresignupspecialization',
  templateUrl: './moresignupspecialization.page.html',
  styleUrls: ['./moresignupspecialization.page.scss'],
})
export class MoresignupspecializationPage implements OnInit {
  isInputEnabled = false;
  isInput2Enabled = false;
  authdetails: any = [];
  credentials: FormGroup;
  originalquery: any = [];
  filteredquery: any = [];
  term: any;
  


  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private auth: AuthService,
    private router: Router,
    private map: GmapService,
    private nc: NavController,
    private profile: ProfilingService,
  ) {
    this.activatedRoute.queryParams.subscribe((params) =>{
      this.authdetails = params;
      console.log(this.authdetails)

      });

      


      

   }

  // get fname() {
  //   return this.credentials.get('fname');
  // }
  // get mname() {
  //   return this.credentials.get('mname');
  // }
  // get lname() {
  //   return this.credentials.get('lname');
  // }
  // get suffix() {
  //   return this.credentials.get('suffix');
  // }

  // get cs() {
  //   return this.credentials.get('cs'); 
  // }

  // get religion() {
  //   return this.credentials.get('religion'); 
  // }
  
  // get sex() {
  //   return this.credentials.get('sex'); 
  // }

  // get bday() {
  //   return this.credentials.get('bday');
  // }
  // get age() {
  //   return this.credentials.get('age');
  // }
  // get contact() {
  //   return this.credentials.get('contact');
  // }

  get specialization() {
    return this.credentials.get('specialization'); 
  }
 

 
 

  // get homeaddress() {
  //   return this.credentials.get('homeaddress'); 
  // }

  // get currentaddress() {
  //   return this.credentials.get('currentaddress'); 
  // }

  ngOnInit() {

    this.credentials = this.fb.group({
      // fname: ['', [Validators.required]],
      // mname: ['', ],
      // lname: ['', [Validators.required]],
      // suffix: ['', ],
      // cs: ['', [Validators.required]],
      // religion: ['', [Validators.required]],
      // sex: ['', [Validators.required]],
      // bday: ['', [Validators.required]],
      // age: ['', [Validators.required]],
      // contact: ['', [Validators.required]],
      // currentcoords: [this.currentcoords, ],
      
      
      specialization: ['', [Validators.required]],

      // currentaddress: ['',],
      // homeaddress: ['',],
      

      
    });

   
    // this.credscurrent = this.fb.group({
    //   currentaddress: ['', [Validators.required]],
    // });

  }


  async signup() {

    // const loading = await this.loadingController.create({
    //   spinner: "dots",
    //   message: "Signing up!"
    // });   
    //  await loading.present();

    // const user = await this.auth.signup(this.credentials.value , this.authdetails.email, this.authdetails.password);
    // await loading.dismiss();
    // const user = await this.auth.signup(this.credentials.value , this.authdetails.email, this.authdetails.password);
    // this.router.navigateByUrl('/moresignupaddress', { replaceUrl: true });
    // const user = await this.auth.signup(this.credentials.value , this.authdetails.email, this.authdetails.password, this.personaldetails.fname, this.personaldetails.mname, this.personaldetails.lname,  this.personaldetails.suffix,  this.personaldetails.cs,  this.personaldetails.religion,  this.personaldetails.sex,  this.personaldetails.bday,  this.personaldetails.age,  this.personaldetails.contact, );
    this.router.navigate(['moresignupaddress'], {queryParams:{specialization: this.specialization.value, 
      fname: this.authdetails.fname, 
      mname: this.authdetails.mname, 
      lname: this.authdetails.lname, 
      suffix: this.authdetails.suffix, 
      cs: this.authdetails.cs, 
      religion: this.authdetails.religion, 
      sex: this.authdetails.sex, 
      bday: this.authdetails.bday,
      age: this.authdetails.age,
      contact: this.authdetails.contact, 
      citizenship: this.authdetails.citizenship, 
      email: this.authdetails.email,
      password: this.authdetails.password} });


    // if (user) {
    //   await this.auth.logout();
    //   this.router.navigateByUrl('/forgotconfirm', { replaceUrl: true });

    //     } else {
    //   this.showAlert('Registration failed', 'Please try again!');
    // }
  }




  toggleInput(event: any) {
    this.isInputEnabled = event.detail.checked;
  }

  toggleInput2(event: any) {
    this.isInput2Enabled = event.detail.checked;
  }

  
  async showAlert(header: any, message: any) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async search(event: any){
    const searchTerm = event.target.value;

    this.auth.getsearch().subscribe(res => {
      this.filteredquery = res;
    });

  

  }


}
