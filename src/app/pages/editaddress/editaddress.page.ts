import { Component, OnInit,ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { GmapService } from 'src/app/services/gmap.service';
import { ProfilingService } from 'src/app/services/profiling.service';

@Component({
  selector: 'app-editaddress',
  templateUrl: './editaddress.page.html',
  styleUrls: ['./editaddress.page.scss'],
})
export class EditaddressPage implements OnInit {
  address: any = [];
  credentials: FormGroup;
  Ccredentials: FormGroup;

  googleMaps: any;
  @ViewChild('map', {static: true}) mapElementRef: ElementRef;
  center: any = {lat: 17.6022248, lng: 121.6768867};
  map:any;
  mapClickListener: any;
  marker: any;
  newmarker: any = {lat: 0, lng:0}
  cmarker: any = {lat: 0, lng:0}
  temp: any = [];



  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private firestore: ProfilingService,
    private router: Router,
    private gmaps: GmapService,
    private renderer: Renderer2,

  ) {

    this.firestore.getaddress().subscribe(res=>{
      this.address = res;
      console.log(this.address)
   
    });
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
    return this.credentials.get('province');
  }
  get country() {
    return this.credentials.get('country');
  }
  get hstreet() {
    return this.credentials.get('hstreet');
  }
  get hbarangay() {
    return this.credentials.get('hbarangay');
  }
  get htown() {
    return this.credentials.get('htown');
  }
  get hprovince() {
    return this.credentials.get('hprovince');
  }
  get hcountry() {
    return this.credentials.get('hcountry');
  }



  ngOnInit() {

   

    this.credentials = this.fb.group({
      currentaddress: ['', [Validators.required]],
      homeaddress: ['', [Validators.required]],
      newmarker: [this.newmarker],

    
      
    });

    this.Ccredentials = this.fb.group({
      
      homeaddress: ['', [Validators.required]],
      
    });

    


  }

ngAfterViewInit(){
  this.firestore.getaddress().subscribe(async res=>{
    this.temp = res;

    if (this.temp.changed == false){
      this.loadMapCurrent();
    }
  });
 
}

  async editadd() {

    const loading = await this.loadingController.create({
      spinner: "dots",
      message: "Adding up!"
    });    await loading.present();

    const user = await this.firestore.editaddress(this.credentials.value);
    await loading.dismiss();

    if (user) {
      this.router.navigate([this.router.url])
      this.router.navigateByUrl('/applicantprofile', { replaceUrl: true });
      this.showAlert('Edit success', 'Data updated!');

        } else {
      this.showAlert('Edit failed', 'Please try again!');
    }
  }

  async Ceditadd() {

    const loading = await this.loadingController.create({
      spinner: "dots",
      message: "Adding up!"
    });    await loading.present();

    const user = await this.firestore.Ceditaddress(this.credentials.value);
    await loading.dismiss();

    if (user) {
      this.router.navigate([this.router.url])
      this.router.navigateByUrl('/applicantprofile', { replaceUrl: true });
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

  async loadMapCurrent(){
    try {

      this.firestore.getaddress().subscribe(async res=>{
        this.address = res;
        console.log(this.address.clat);
        console.log(this.address.clng);

        let googleMaps: any = await this.gmaps.loadGoogleMaps();
      this.googleMaps = googleMaps;
      const mapEl = this.mapElementRef.nativeElement;
      const location = new googleMaps.LatLng(this.address.clat, this.address.clng);
      this.map =  new googleMaps.Map(mapEl,{
        center: location,
        zoom: 12,
        mapTypeId: 'terrain',
        disableDefaultUI: true,
      }); 

      this.map.setCenter({lat: this.address.clat, lng: this.address.clng});
      this.renderer.addClass(mapEl, 'visible');
      this.addMarker({lat: this.address.clat, lng: this.address.clng});
      this.onMapDrag();
  
      });


      

     
    }catch(e){
      console.log(e);
    }
  }


  addMarker(location: any){
    let googleMaps: any = this.googleMaps;

    const source_icon = {
      url: 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=O|FF0000|000000',
      scaledSize: new googleMaps.Size(30, 40), // scaled size
      origin: new googleMaps.Point(0, 0), // origin
      anchor: new googleMaps.Point(0, 0) // anchor
    };

    this.marker = new googleMaps.Marker({
      position: location,
      map: this.map,
      icon: source_icon,
      draggable: true,
      animation: googleMaps.Animation.DROP
    });

    // const position = this.marker.getPosition();

  }

  async onMapDrag() {
    this.mapClickListener = this.googleMaps.event.addListener(this.marker, "dragend", ( mapsMouseEvent) => {
      console.log(mapsMouseEvent.latLng.toJSON());
      const storage = mapsMouseEvent.latLng.toJSON();
      this.newmarker.lat = storage.lat;
      this.newmarker.lng = storage.lng;
      console.log(this.credentials.value);

      const test =   this.gmaps.rgeocode(this.newmarker.lat, this.newmarker.lng).subscribe(res => {
        this.address.currentaddress = res.results[0].formatted_address;
        
    
      
       });

    });
  }

  

}
