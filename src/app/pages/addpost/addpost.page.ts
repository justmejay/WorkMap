import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service'; 
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { DomSanitizer } from '@angular/platform-browser';
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
  selector: 'app-addpost',
  templateUrl: './addpost.page.html',
  styleUrls: ['./addpost.page.scss'],
})
export class AddpostPage implements OnInit {
  post: any = [];
  credentials: FormGroup;

  public camera: any;
  public base64Image: any;
  public image: Photo;

  get ptitle() {
    return this.credentials.get('ptitle');
  }

  get pdescription() {
    return this.credentials.get('pdescription');
  }

  constructor(
    private firestore: PostService,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private auth: AuthService,
    private router: Router,
    private storage: Storage,
    private authd: Auth,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
  ) { 

    this.activatedRoute.queryParams.subscribe((params) =>{

      this.post = params;
      console.log(this.post.puid)
      console.log(this.post.pfname)
      console.log(this.post.pmname)
      console.log(this.post.plname)

      

      this.firestore.getpost().subscribe(res=>{
        this.post = res;
        console.log(this.post)
      })
    })
    
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      ptitle: ['', [Validators.required]],
      pdescription: ['', [Validators.required]],

      fname: [this.post.pfname],
      mname: [this.post.pmname],
      lname: [this.post.plname],
    });
  }

  async addImage(){ 
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera, // Camera, Photos or Prompt!
    });

    this.base64Image = "data:image/jpeg;base64, " + image.base64String;
    this.image = image;


  }

  async getSafeUrl() { 
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.base64Image);     
}

  async addpost() {

    const loading = await this.loadingController.create({
      spinner: "dots",
      message: "Adding up!"
    });    await loading.present();

    const user = await this.firestore.addpost(this.credentials.value);
    await loading.dismiss();

    if (user) {
      this.firestore.getImageData(this.image, user.id);
      
      const uid = this.post.uid;

      // this.router.navigateByUrl('/hometab', { replaceUrl: true });
      this.router.navigate(['hometab'], {queryParams:{usid: uid}});
      this.showAlert('Add success', '');


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
