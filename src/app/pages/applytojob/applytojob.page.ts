import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ProfilingService } from 'src/app/services/profiling.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
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
  selector: 'app-applytojob',
  templateUrl: './applytojob.page.html',
  styleUrls: ['./applytojob.page.scss'],
})
export class ApplytojobPage implements OnInit {
  profile: any = [];
  address: any = [];
  resume: any = [];
  certifications: any = []; 
  school: any = [];
  experience: any = [];

   credentials: FormGroup;

  get name() {
    return this.credentials.get('name');
  }

  get bday() {
    return this.credentials.get('bday');
  }

  get age() {
    return this.credentials.get('age');
  }

  get homeaddress() {
    return this.credentials.get('homeaddress');
  }

  get currentaddress() {
    return this.credentials.get('currentaddress');
  }

  get cs() {
    return this.credentials.get('cs');
  }

  get religion() {
    return this.credentials.get('religion');
  }

  get specialization() {
    return this.credentials.get('specialization');
  }

  get mo() {
    return this.credentials.get('mo');
  }

  get moc() {
    return this.credentials.get('moc');
  }

  get fa() {
    return this.credentials.get('fa');
  }

  get fac() {
    return this.credentials.get('fac');
  }

  get schoolname() {
    return this.credentials.get('schoolname');
  }

  get course() {
    return this.credentials.get('course');
  }

  get level() {
    return this.credentials.get('level');
  }

  get yearg() {
    return this.credentials.get('yearg');
  }

  get cname() {
    return this.credentials.get('cname');
  }

  get caddress() {
    return this.credentials.get('caddress');
  }

  get jtitle() {
    return this.credentials.get('jtitle');
  }

  get datef() {
    return this.credentials.get('datef');
  }

  get datet() {
    return this.credentials.get('datet');
  }

  get reason() {
    return this.credentials.get('reason');
  }

  get cnnname() {
    return this.credentials.get('cnnname');
  }

  get orgn() {
    return this.credentials.get('orgn');
  }

  get year() {
    return this.credentials.get('year');
  }

  get fpath() {
    return this.credentials.get('fpath');
  }

  get fpathr() {
    return this.credentials.get('fpathr');
  }

  constructor(
    private firestore: ProfilingService,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private auth: AuthService,
    private router: Router,
    private storage: Storage,
    private authd: Auth,
    private activatedRoute: ActivatedRoute,
  ) { 
    this.firestore.getprofile().subscribe(res=>{
      this.profile = res;

    })
    this.firestore.getaddress().subscribe(res=>{
      this.address = res;
      console.log(this.address)

    })
    this.firestore.getcertification().subscribe(res=>{
      this.certifications = res;

    })

    this.firestore.getexperience().subscribe(res=>{
      this.experience = res;

    })

    this.firestore.getschool().subscribe(res=>{
      this.school = res;

    })

    this.firestore.getresume().subscribe(res=>{
      this.resume = res;

    })


  }

  ngOnInit() {
    this.credentials = this.fb.group({
      name: ['', [Validators.required]],
      bday: ['', [Validators.required]],
      age: ['', [Validators.required]],
      homeaddress: ['', [Validators.required]],
      currentaddress: ['', [Validators.required]],
      cs: ['', [Validators.required]],
      religion: ['', [Validators.required]],
      specialization: ['', [Validators.required]],
      mo: ['', [Validators.required]],
      moc: ['', [Validators.required]],
      fa: ['', [Validators.required]],
      fac: ['', [Validators.required]],
      schoolname: ['', []],
      course: ['', []],
      level: ['', []],
      yearg: ['', []],
      cname: ['', []],
      caddress: ['', []],
      jtitle: ['', []],
      datef: ['', []],
      datet: ['', []],
      reason: ['', []],
      cnname: ['', []],
      orgn: ['', []],
      year: ['', []],
      fpath: ['', []],
      fpathr: ['', [Validators.required]],
    });
  }

  async addapplication() {

    const loading = await this.loadingController.create({
      spinner: "dots",
      message: "Adding up!"
    });    await loading.present();

    const user = await this.firestore.addapplication(this.credentials.value);
    await loading.dismiss();

    if (user) {
      this.router.navigateByUrl('/dashboard', { replaceUrl: true });
      this.showAlert('Application success', '');


        } else {
      this.showAlert('Application failed', 'Please try again!');
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
