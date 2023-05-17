import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { CompanyService } from 'src/app/services/company.service'; 
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
import { ProfilingService } from 'src/app/services/profiling.service';



@Component({
  selector: 'app-editemployerprofile',
  templateUrl: './editemployerprofile.page.html',
  styleUrls: ['./editemployerprofile.page.scss'],
})
export class EditemployerprofilePage implements OnInit {
  employer: any = [];
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

  get citizenship() {
    return this.credentials.get('citizenship');
  }

  get contact() {
    return this.credentials.get('contact');
  }

  get email() {
    return this.credentials.get('email');
  }

  constructor(
    private firestore: CompanyService,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private auth: AuthService,
    private router: Router,
    private storage: Storage,
    private authd: Auth,
    private firestore2: ProfilingService,
    private toastController: ToastController

 
  ) { 
    this.firestore.getemployer().subscribe(res=>{
      this.employer = res;

    })
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      fname: ['', [Validators.required]],
      mname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      citizenship: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });
  }


  async editemployer() {

    const loading = await this.loadingController.create({
      spinner: "dots",
      message: "Adding up!"
    });    await loading.present();
    await loading.present();

    const employer = await this.firestore.editemployer(this.credentials.value);

    if (this.selecteditemx != null){
      const generateunique = `${new Date().getTime()}_${this.filename}`;
      const fileStoragePath = `filesStorage/employer/${this.authd.currentUser.uid}/profile.png`;
      const storageRef = ref(this.storage, fileStoragePath);
      const uploadfile = await uploadBytes(storageRef, this.selecteditemx);
      const fileUrl = await getDownloadURL(storageRef);
      await this.firestore.editprofiledp(fileUrl);
      }

    
    await loading.dismiss();

    if (employer) {
      this.router.navigateByUrl('/companyprofile', { replaceUrl: true });
      this.toastPresent('Edit success. Data updated!');


        } else {
      this.toastPresent('Edit failed. Please try again!'); 
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

      const result = await this.firestore2.uploadImagec(image);
      loading.dismiss();

      if (result) {
        this.toastPresent('Profile Picture Updated!')
      }

    }
  }



  async upload(event: any){

    this.fileevent = event;
    const selecteditem = event.target.files
    this.selecteditemx = selecteditem.item(0)
    this.filename  = this.selecteditemx.name
    this.filesize  = this.selecteditemx.size;


  }




  async showAlert(header: any, message: any) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
  async toastPresent(message: any){
    const toast = await this.toastController.create({
      message,
      duration: 1000
    });
    await toast.present();
  }



}
