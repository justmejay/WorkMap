import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      fname: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      mname: ['', []],
      lname: ['', [Validators.required]],
      suffix: ['', []],
      bday: ['', [Validators.required]],
      age: ['', [Validators.required]],
      sex: ['', [Validators.required]],
      cs: ['', [Validators.required]],
      religion: ['', [Validators.required]],
      citizenship: ['', [Validators.required]],
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
