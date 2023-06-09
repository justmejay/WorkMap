import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ProfilingService } from 'src/app/services/profiling.service'; 
import {
  getDownloadURL,
  ref,
  Storage,
  uploadString,
  uploadBytes,
  deleteObject
} from '@angular/fire/storage';
import { Auth } from '@angular/fire/auth';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';



@Component({
  selector: 'app-editpersonalinfo',
  templateUrl: './editpersonalinfo.page.html',
  styleUrls: ['./editpersonalinfo.page.scss'],
})
export class EditpersonalinfoPage implements OnInit {
  profile: any = [];
  credentials: FormGroup;
  @ViewChild('myInput')
  myInputVariable: ElementRef; 
  selected:any
  files: any = []
  selecteditemx:any
  filename:any
  filesize:any
  fileevent:any
  agecompute: number;



  get fname() {
    return this.credentials.get('fname');
  }
  get mname() {
    return this.credentials.get('mname');
  }
  get lname() {
    return this.credentials.get('lname');
  }
  get suffix() {
    return this.credentials.get('suffix');
  }
  get bday() {
    return this.credentials.get('bday');
  }
  get age() {
    return this.credentials.get('age');
  }
  get sex() {
    return this.credentials.get('bday');
  }
  get contact() {
    return this.credentials.get('age');
  }

  get cs() {
    return this.credentials.get('cs');
  }
  get religion() {
    return this.credentials.get('religion');
  }

  get citizenship() {
    return this.credentials.get('citizenship');
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
    private toastController: ToastController



  ) {
    this.firestore.getprofile().subscribe(res=>{
      this.profile = res;

    })
   }




  ngOnInit() {
    this.credentials = this.fb.group({
      fname: ['', [Validators.required, Validators.pattern('^[A-Z][a-z]*(?: [A-Z][a-z]*)*$')]],
      contact: ['', [Validators.required, Validators.pattern('^09\\d{9}$')]],
      mname: ['', []],
      lname: ['', [Validators.required, Validators.pattern('^[A-Z][a-z]*(?: [A-Z][a-z]*)*$')]],
      suffix: ['', []],
      bday: ['', [Validators.required, this.ageValidator]],
      age: ['', [Validators.required]],
      sex: ['', [Validators.required]],
      cs: ['', [Validators.required]],
      religion: ['', [Validators.required]],
      citizenship: ['', [Validators.required]],
      ea: ['', [Validators.required]],

    });
    
  }

  async editprofile() {

    const loading = await this.loadingController.create({
      spinner: "dots",
      message: "Adding up!"
    });    await loading.present();
    await loading.present();

    const user = await this.firestore.editprofile(this.credentials.value);

   
    
    await loading.dismiss();

    if (user) {
      this.router.navigateByUrl('/applicantprofile', { replaceUrl: true });
      this.presentToast('Sucess!')


        } else {
      this.presentToast('Failed! Try again later');
    }
  }



  async changeImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Prompt, // Camera, Photos or Prompt!
    });

    if (image) {
      const loading = await this.loadingController.create();
      await loading.present();

      const result = await this.firestore.uploadImage(image);
      loading.dismiss();

      if (result) {
        this.presentToast('Profile Picture Updated!')
      }

    }
  }




  ageValidator(control: AbstractControl): ValidationErrors | null {
    const bday = new Date(control.value);
    const today = new Date();
    const ageDiff = today.getTime() - bday.getTime();
    const ageDate = new Date(ageDiff);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
 
  
    return age >= 18 && age<=65 ? null : { 'underAge': true };
  }

  computeAge(){
    const bday = new Date(this.credentials.value.bday);
    const today = new Date();
    const ageDiff = today.getTime() - bday.getTime();
    const ageDate = new Date(ageDiff);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
  
    console.log(age);
    this.agecompute = age;
  
  }




  async showAlert(header: any, message: any) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentToast(message: any) {
    const toast = await this.toastController.create({
      message,
      duration: 1000,
      position: 'bottom',
    });

    await toast.present();

  }

}
