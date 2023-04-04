import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadString,
  uploadBytes,
  deleteObject
} from '@angular/fire/storage';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ProfilingService } from 'src/app/services/profiling.service';

@Component({
  selector: 'app-editresume',
  templateUrl: './editresume.page.html',
  styleUrls: ['./editresume.page.scss'],
})
export class EditresumePage implements OnInit { 
  resume: any = [];
  @ViewChild('myInput')
  myInputVariable: ElementRef; 
  selected:any
  files: any = []
  selecteditemx:any
  filename:any
  filesize:any
  fileevent:any

  constructor(
    private firestore: ProfilingService,
   private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router,
    private storage: Storage,
    private authd: Auth
  ) {
    this.firestore.getresume().subscribe(res=>{
      this.resume = res;

    });
   }

  ngOnInit() {
  }

  async upload(event: any){

    this.fileevent = event;
    const selecteditem = event.target.files
    this.selecteditemx = selecteditem.item(0)
    this.filename  = this.selecteditemx.name
    this.filesize  = this.selecteditemx.size;


  }

  async editrfile() {

    const loading = await this.loadingController.create({
      spinner: "dots",
      message: "Adding up!"
    });    await loading.present();
    await loading.present();

    if (this.selecteditemx != null){
    const fname  = this.resume.filename;

    if (fname != ""){
      await this.firestore.deleterfile(fname);

    }

    const generateunique = `${new Date().getTime()}_${this.filename}`; 
    const fileStoragePath = `filesStorage/resume/${this.authd.currentUser.uid}/${generateunique}`;
    const storageRef = ref(this.storage, fileStoragePath);
    const uploadfile = await uploadBytes(storageRef, this.selecteditemx);
    const fileUrl = await getDownloadURL(storageRef);
    const user = await this.firestore.editresumefile(fileUrl, generateunique);
    }
    
    await loading.dismiss();

    if (user) {

      this.router.navigateByUrl('/resumebuilder', { replaceUrl: true });
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
