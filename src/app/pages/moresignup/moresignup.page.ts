import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { GmapService } from 'src/app/services/gmap.service';
import { Geolocation } from '@capacitor/geolocation';



@Component({
  selector: 'app-moresignup',
  templateUrl: './moresignup.page.html',
  styleUrls: ['./moresignup.page.scss'],
})
export class MoresignupPage implements OnInit {
  isInputEnabled = false;
  isInput2Enabled = false;
  authdetails: any = [];
  credentials: FormGroup;
  credshome: FormGroup;
  addresses: any = [];
  selectedHome: any;
  homePlaceID:any  ; 
  homecoords: any  = {lat: 0, lng: 0} 
  selectedCurrent: any;
  currentPlaceID:any ; 
  currentcoords: any  = {lat: 0, lng: 0} 
  credscurrent: FormGroup;
  addressesc: any = [];
  homea: any = [];
  currenta: any = [];
  


  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private auth: AuthService,
    private router: Router,
    private map: GmapService
  ) {
    this.activatedRoute.queryParams.subscribe((params) =>{
      this.authdetails = params;
      console.log(this.authdetails)

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
  get suffix() {
    return this.credentials.get('suffix');
  }
  get bday() {
    return this.credentials.get('bday');
  }
  get age() {
    return this.credentials.get('age');
  }
  get contact() {
    return this.credentials.get('contact');
  }

  get specialization() {
    return this.credentials.get('specialization'); 
  }
 

  get sex() {
    return this.credentials.get('sex'); 
  }
  get cs() {
    return this.credentials.get('cs'); 
  }
  get religion() {
    return this.credentials.get('religion'); 
  }

  get homeaddress() {
    return this.credentials.get('homeaddress'); 
  }

  get currentaddress() {
    return this.credentials.get('currentaddress'); 
  }

  ngOnInit() {

    this.credentials = this.fb.group({
      fname: ['', [Validators.required]],
      mname: ['', ],
      lname: ['', [Validators.required]],
      sex: ['', [Validators.required]],
      suffix: ['', ],
      bday: ['', [Validators.required]],
      age: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      homecoords: [this.homecoords, ],
      currentcoords: [this.currentcoords, ],
      cs: ['', [Validators.required]],
      religion: ['', [Validators.required]],
      specialization: ['', [Validators.required]],

      currentaddress: ['',],
      homeaddress: ['',],
      homePlaceID: ['', ],
      currentPlaceID: ['', ], 
      

      
    });

    this.credshome = this.fb.group({
      homeaddress: ['', [Validators.required]],
    });
    this.credscurrent = this.fb.group({
      currentaddress: ['', [Validators.required]],
    });

  }


  async signup() {

    const loading = await this.loadingController.create({
      spinner: "dots",
      message: "Signing up!"
    });   
     await loading.present();

    const user = await this.auth.signup(this.credentials.value , this.authdetails.email, this.authdetails.password);
    await loading.dismiss();

    if (user) {
      await this.auth.logout();
      this.router.navigateByUrl('/forgotconfirm', { replaceUrl: true });

        } else {
      this.showAlert('Registration failed', 'Please try again!');
    }
  }




  toggleInput(event: any) {
    this.isInputEnabled = event.detail.checked;
  }

  toggleInput2(event: any) {
    this.isInput2Enabled = event.detail.checked;
  }

  
  async showAlert(header: any, message: any) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async searchome() {

    const loading = await this.loadingController.create({
      spinner: "dots",
      message: "Looking up!"
    });   
     await loading.present();
     
    const test =  await this.map.search_map(this.credshome.value.homeaddress).subscribe(res => {
     this.addresses = res.predictions;
    });

    await loading.dismiss();
  
 }

 async searchCurrent() {

  const loading = await this.loadingController.create({
    spinner: "dots",
    message: "Looking up!"
  });   
   await loading.present();
   
  const test =  await this.map.search_map(this.credscurrent.value.currentaddress).subscribe(res => {
   this.addressesc = res.predictions;
  });

  await loading.dismiss();

}

 async onSelect(address: any){
  const test =  await this.map.geocode(address.place_id).subscribe(res => {
    
    this.homecoords.lat =  res.results[0].geometry.location.lat;
    this.homecoords.lng =  res.results[0].geometry.location.lng;
    this.homePlaceID = address.place_id;


    

    this.selectedHome = res.results[0].formatted_address;
    this.homea = res.results[0].formatted_address;
   });
   const sleep = (ms) => new Promise(r => setTimeout(r, ms));
   await sleep(500);   

   this.addresses = [];

   console.log(this.homePlaceID);
   console.log(this.homecoords.lat);
   console.log(this.homecoords.lng);

 };

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

   console.log(this.homePlaceID);
   console.log(this.homecoords.lat);
   console.log(this.homecoords.lng);

 };
 
async getCurrent(){
  const coordinates = await Geolocation.getCurrentPosition();
  const test =  await this.map.rgeocode(coordinates.coords.latitude, coordinates.coords.longitude).subscribe(res => {
    this.selectedHome = res.results[0].formatted_address;
    this.homecoords.lat =  res.results[0].geometry.location.lat;
    this.homecoords.lng =  res.results[0].geometry.location.lng;
    this.homePlaceID = res.results[0].place_id;
    this.homea = res.results[0].formatted_address;

    
 
    
  
   });
  
}

async getCurrentc(){
  const coordinates = await Geolocation.getCurrentPosition();
  const test =  await this.map.rgeocode(coordinates.coords.latitude, coordinates.coords.longitude).subscribe(res => {
    this.selectedCurrent = res.results[0].formatted_address;
    this.currentcoords.lat =  res.results[0].geometry.location.lat;
    this.currentcoords.lng =  res.results[0].geometry.location.lng;
    this.currentPlaceID = res.results[0].place_id;
    this.currenta = res.results[0].formatted_address;



  
   });
  
}

async check(){
  console.log(this.credentials.value,);
  console.log(this.currenta);
  console.log(this.homea);

}
  

}
