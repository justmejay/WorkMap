import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ProfilingService } from 'src/app/services/profiling.service'; 
import {
  getDownloadURL,
  ref,
  Storage,
  uploadString,
  uploadBytes,
} from '@angular/fire/storage';
import { Auth } from '@angular/fire/auth';


@Component({
  selector: 'app-addcertification',
  templateUrl: './addcertification.page.html',
  styleUrls: ['./addcertification.page.scss'],
})
export class AddcertificationPage implements OnInit {
  certifications: any =[];
  credentials: FormGroup;

  @ViewChild('myInput')
  myInputVariable: ElementRef;
  selected:any
  files: any = []
  selecteditemx:any
  filename:any
  filesize:any
  fileevent:any



  get name() {
    return this.credentials.get('name');
  }
  get orgn() {
    return this.credentials.get('orgn');
  }
  get year() {
    return this.credentials.get('year');
  }
 

  constructor(
    private profile: ProfilingService,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private firestore: ProfilingService,
    private router: Router,
    private storage: Storage,
    private auth: Auth
 
  ) {

    
    this.profile.getcertification().subscribe(res=>{
      this.certifications = res;
      console.log(this.certifications)

    });

   }

   async upload(event: any){

    this.fileevent = event;
    const selecteditem = event.target.files
    this.selecteditemx = selecteditem.item(0)
    this.filename  = this.selecteditemx.name
    this.filesize  = this.selecteditemx.size;


  }


  ngOnInit() {
    this.credentials = this.fb.group({
      name: ['', [Validators.required,]],
      orgn: ['', [Validators.required,]],
      year: ['', [Validators.required,]],
    });
  }



  async addcert() {

    const loading = await this.loadingController.create({
      spinner: "dots",
      message: "Adding up!"
    });    await loading.present();

    const user = await this.firestore.addcert(this.credentials.value);

   
    if (user) {
    
      if (this.selecteditemx != null){
        const id = user.id;
        const generateunique = `${new Date().getTime()}_${this.filename}`;
        const fileStoragePath = `filesStorage/certifications/${this.auth.currentUser.uid}/${id}/${generateunique}`;
        const storageRef = ref(this.storage, fileStoragePath);
        const uploadfile = await uploadBytes(storageRef, this.selecteditemx);
        const fileUrl = await getDownloadURL(storageRef);
        await this.firestore.editcertfile(fileUrl,id,generateunique);
        }


        await loading.dismiss();
        await this.router.navigateByUrl('/certifications', { replaceUrl: true });
      this.showAlert('Add success', 'Great job building your profile!');

        } else {
      this.showAlert('Add failed', 'Please try again!');
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
