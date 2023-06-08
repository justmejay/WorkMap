import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { GmapService } from 'src/app/services/gmap.service';
import { Geolocation } from '@capacitor/geolocation';
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


@Component({
  selector: 'app-moresignupc',
  templateUrl: './moresignupc.page.html',
  styleUrls: ['./moresignupc.page.scss'],
})
export class MoresignupcPage implements OnInit {
  authdetails: any = [];
  authdetails2: any = [];
  credentials: FormGroup;
  credscurrent: FormGroup;
  addressesc: any = [];
  selectedCurrent: any;
  currentPlaceID : any;
  currentcoords: any = {lat: 0, lng: 0}
  isToggled: boolean = false;

  public camera: any;
  public base64Image: any = null;
  public image: Photo;



  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private auth: AuthService,
    private router: Router,
    private map: GmapService,
    private storage: Storage,
    private sanitizer: DomSanitizer,

  ) { 
    this.activatedRoute.queryParams.subscribe((params) =>{
      this.authdetails = params;
 

      

      });
  }

  get fname() {
    return this.credentials.get('fname');
  }
  get mname() {
    return this.credentials.get('mname');
  }
  get lname() {
    return this.credentials.get('lname');
  }
  get contact() {
    return this.credentials.get('contact');
  }
  get citizenship() {
    return this.credentials.get('citizenship');
  }
  get cname() {
    return this.credentials.get('cname');
  }
  get ccontact() {
    return this.credentials.get('ccontact');
  }
  // get street() {
  //   return this.credentials.get('street');
  // }
  // get barangay() {
  //   return this.credentials.get('barangay');
  // }
  // get town() {
  //   return this.credentials.get('town');
  // }
  // get province() {
  //   return this.credentials.get('town');
  // }
  // get country() {
  //   return this.credentials.get('town');
  // }
  get cemail() {
    return this.credentials.get('cemail');
  }
  get companyaddress() {
    return this.credentials.get('companyaddress');
  }

  get brnumber() {
    return this.credentials.get('brnumber');
  }
 
 




  ngOnInit() {
    this.credentials = this.fb.group({
      fname: ['', [Validators.required]],
      mname: ['', []],
      lname: ['', [Validators.required]],
      contact: ['', [Validators.required, Validators.pattern('^09\\d{9}$')]],
      citizenship: ['', [Validators.required]],
      ccontact: ['', [Validators.required, Validators.pattern('^09\\d{9}$')]],
      cname: ['', [Validators.required]],
      companyaddress: ['', []],
      cemail: ['', [Validators.required]],
     currentcoordss: [this.currentcoords, []],
     currentPlaceID: ['', []],
     brnumber: ['', [Validators.required]],
     tin: ['', [Validators.required]],





      
      

      
    });

    this.credscurrent = this.fb.group({
      companyaddress: ['', [Validators.required]],
    });
    

  }

  async addbrcert(){ 
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


  async signupc() {

    const loading = await this.loadingController.create({
      spinner: "dots",
      message: "Signing up!"
    });    await loading.present();

    const user = await this.auth.signupc(this.credentials.value, this.authdetails.email, this.authdetails.password, this.image);
    
   
    await loading.dismiss();

    if (user) {
      await this.auth.logout();
      this.router.navigateByUrl('/forgotconfirm', { replaceUrl: true });

        } else {
      this.showAlert('Registration failed', 'Please try again!');
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

  async searchCurrent() {

    const loading = await this.loadingController.create({
      spinner: "dots",
      message: "Looking up!"
    });   
     await loading.present();
     
    const test =  await this.map.search_map(this.credscurrent.value.companyaddress).subscribe(res => {
     this.addressesc = res.predictions;
    });
  
    await loading.dismiss();
  
  }

  async onSelectc(address: any){
    const test =  await this.map.geocode(address.place_id).subscribe(res => {
      
      this.currentcoords.lat =  res.results[0].geometry.location.lat;
      this.currentcoords.lng =  res.results[0].geometry.location.lng;
      this.currentPlaceID = address.place_id;
  
  
      
  
      this.selectedCurrent = res.results[0].formatted_address;
  
     });
     const sleep = (ms) => new Promise(r => setTimeout(r, ms));
     await sleep(500);   
  
     this.addressesc = [];
  
     
  
   };

   async getCurrentc(){
    const loading = await this.loadingController.create({
      message: 'Finding You!' ,
      spinner: 'dots'
    });
    this.addressesc = [];
    await loading.present();
    const coordinates = await Geolocation.getCurrentPosition();
    const test =  await this.map.rgeocode(coordinates.coords.latitude, coordinates.coords.longitude).subscribe(res => {
      this.selectedCurrent = res.results[0].formatted_address;
      this.currentcoords.lat =  res.results[0].geometry.location.lat;
      this.currentcoords.lng =  res.results[0].geometry.location.lng;
      this.currentPlaceID = res.results[0].place_id;
    
     });
     await loading.dismiss();

    
  }

  samemail(event: any){
    const a  = event.currentTarget.checked;
    console.log(a);

    this.activatedRoute.queryParams.subscribe((params) =>{
      this.authdetails2 = params;
      if (a == false){
        this.credentials.value.cemail = this.authdetails2.email;
        this.isToggled = true;
      }else{
        this.credentials.value.cemail = "";
        this.isToggled = false;
      }   

      });

   
  }



 

}
