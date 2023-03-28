import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
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

  constructor(
    private firestore: ProfilingService,
   private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private auth: AuthService,
    private router: Router,
    private storage: Storage,


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
    });
    
  }

  async editprofile() {

    const loading = await this.loadingController.create({
      spinner: "dots",
      message: "Adding up!"
    });    await loading.present();
    await loading.present();
    const generateunique = `${new Date().getTime()}_${this.filename}`;
    const fileStoragePath = `filesStorage/${generateunique}`;
    const storageRef = ref(this.storage, fileStoragePath);
    const uploadfile = await uploadBytes(storageRef, this.selecteditemx);
    const fileUrl = await getDownloadURL(storageRef);

    const user = await this.firestore.editprofile(this.credentials.value);
     await this.firestore.editprofiledp(fileUrl);

    await loading.dismiss();

    if (user) {
      this.router.navigateByUrl('/applicantprofile', { replaceUrl: true });
      this.showAlert('Edit success', 'Data updated!');


        } else {
      this.showAlert('Edit failed', 'Please try again!');
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


}
