import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder , FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ProfilingService } from 'src/app/services/profiling.service';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadString,
  uploadBytes,
} from '@angular/fire/storage';


@Component({
  selector: 'app-editcertifications',
  templateUrl: './editcertifications.page.html',
  styleUrls: ['./editcertifications.page.scss'],
})
export class EditcertificationsPage implements OnInit {
  cid: any;
  certifications: any = [];
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
    private activatedRoute: ActivatedRoute,
    private firestore: ProfilingService,
    private profile:  ProfilingService,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router,
    private auth: Auth,
    private storage: Storage,
  ) { 
    this.activatedRoute.queryParams.subscribe((params) =>{
      this.cid = params['cid'];
      console.log(this.cid)

      this.firestore.getcertbyID(this.cid).subscribe(res => {
        this.certifications = res;
        console.log(this.certifications);
      });


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


  async editcert() {

    const loading = await this.loadingController.create({
      spinner: "dots",
      message: "Adding up!"
    });    await loading.present();

    const user = await this.firestore.editcert(this.credentials.value, this.cid);


      if (this.selecteditemx != null){
        const id = this.cid;
        const fname = this.certifications.filename;
        await this.profile.deletecertfile(id, fname);


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
