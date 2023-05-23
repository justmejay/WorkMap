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
  selector: 'app-editpostcompany',
  templateUrl: './editpostcompany.page.html',
  styleUrls: ['./editpostcompany.page.scss'],
})
export class EditpostcompanyPage implements OnInit {
  post: any = [];
  credentials: FormGroup;

  filename:any

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
      console.log(this.post.postid)

      

      this.firestore.getpostid(this.post.postid).subscribe(res=>{
        this.post = res;
        console.log(this.post)
        this.base64Image = this.post.imageUrl
      })
    })
    
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      ptitle: ['', [Validators.required]],
      pdescription: ['', [Validators.required]],

      // profileimg: [this.post.profileimg],

     
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

async editpost() {

  const loading = await this.loadingController.create({
    spinner: "dots",
    message: "Updating!"
  });    await loading.present();
  await loading.present();

  const post = await this.firestore.editpost(this.credentials.value, this.post.listid);

  
  await loading.dismiss();

  if (post) {

    this.firestore.getImageData(this.image, this.post.listid);
    
    this.router.navigateByUrl('/mypostcompany', { replaceUrl: true });
    this.showAlert('Update success', '');


      } else {
    this.showAlert('Update failed. Please try again!', '');
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

  undoimage(){
    this.base64Image = null;
  }

  


}

