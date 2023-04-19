import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { GmapService } from 'src/app/services/gmap.service';
import { Geolocation } from '@capacitor/geolocation';


@Component({
  selector: 'app-moresignupc',
  templateUrl: './moresignupc.page.html',
  styleUrls: ['./moresignupc.page.scss'],
})
export class MoresignupcPage implements OnInit {
  authdetails: any = [];
  credentials: FormGroup;
  credscurrent: FormGroup;
  addressesc: any = [];
  selectedCurrent: any;
  currentPlaceID : any;
  currentcoords: any = {lat: 0, lng: 0}



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
  get contact() {
    return this.credentials.get('lname');
  }
  get cname() {
    return this.credentials.get('lname');
  }
  get ccontact() {
    return this.credentials.get('lname');
  }
  get street() {
    return this.credentials.get('street');
  }
  get barangay() {
    return this.credentials.get('barangay');
  }
  get town() {
    return this.credentials.get('town');
  }
  get province() {
    return this.credentials.get('town');
  }
  get country() {
    return this.credentials.get('town');
  }
  get cemail() {
    return this.credentials.get('cemail');
  }
  get companyaddress() {
    return this.credentials.get('companyaddress');
  }
 




  ngOnInit() {
    this.credentials = this.fb.group({
      fname: ['', [Validators.required]],
      mname: ['', []],
      lname: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      ccontact: ['', [Validators.required]],
      cname: ['', [Validators.required]],
      companyaddress: ['', []],
      cemail: ['', [Validators.required]],
     currentcoordss: [this.currentcoords, []],
     currentPlaceID: ['', []],




      
      

      
    });

    this.credscurrent = this.fb.group({
      companyaddress: ['', [Validators.required]],
    });
    

  }


  async signupc() {

    const loading = await this.loadingController.create({
      spinner: "dots",
      message: "Signing up!"
    });    await loading.present();

    const user = await this.auth.signupc(this.credentials.value, this.authdetails.email, this.authdetails.password);
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
    const coordinates = await Geolocation.getCurrentPosition();
    const test =  await this.map.rgeocode(coordinates.coords.latitude, coordinates.coords.longitude).subscribe(res => {
      this.selectedCurrent = res.results[0].formatted_address;
      this.currentcoords.lat =  res.results[0].geometry.location.lat;
      this.currentcoords.lng =  res.results[0].geometry.location.lng;
      this.currentPlaceID = res.results[0].place_id;
    
     });
    
  }

  checkl(){
    console.log(this.credentials.value);
  }

 

}
