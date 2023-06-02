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
  authdetails2: any = [];
  credentials: FormGroup;
  credscurrent: FormGroup;
  addressesc: any = [];
  selectedCurrent: any;
  currentPlaceID : any;
  currentcoords: any = {lat: 0, lng: 0}
  isToggled: boolean = false;



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
      contact: ['', [Validators.required]],
      citizenship: ['', [Validators.required]],
      ccontact: ['', [Validators.required]],
      cname: ['', [Validators.required]],
      companyaddress: ['', []],
      cemail: ['', [Validators.required]],
     currentcoordss: [this.currentcoords, []],
     currentPlaceID: ['', []],

     brnumber: ['', [Validators.required]],




      
      

      
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
