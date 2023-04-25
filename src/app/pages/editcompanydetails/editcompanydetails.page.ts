import { Component, Renderer2,OnInit,ElementRef,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { CompanyService } from 'src/app/services/company.service'; 
import {
  getDownloadURL,
  ref,
  Storage,
  uploadString,
  uploadBytes,
  deleteObject
} from '@angular/fire/storage';
import { Auth } from '@angular/fire/auth';
import { GmapService } from 'src/app/services/gmap.service';

@Component({
  selector: 'app-editcompanydetails',
  templateUrl: './editcompanydetails.page.html',
  styleUrls: ['./editcompanydetails.page.scss'],
})
export class EditcompanydetailsPage implements OnInit {
  company: any = [];
  credentials: FormGroup;
  @ViewChild('map', {static: true}) mapElementRef: ElementRef;
  googleMaps: any;
  map:any;
  marker: any;
  mapClickListener: any;
  newmarker: any = [];
  @ViewChild('myInput')
  myInputVariable: ElementRef; 
  selected:any
  files: any = []
  selecteditemx:any
  filename:any
  filesize:any
  fileevent:any




  get cname() {
    return this.credentials.get('cname');
  }

  get ccontact() {
    return this.credentials.get('ccontact');
  }

  get cemail() {
    return this.credentials.get('cemail');
  }

  get csize() {
    return this.credentials.get('cname');
  }

  get cprocessingtime1() {
    return this.credentials.get('cprocessingtime1');
  }

  get cprocessingtime2() {
    return this.credentials.get('cprocessingtime2');
  }

  get cbenefits() {
    return this.credentials.get('cbenefits');
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

  get cdetails() {
    return this.credentials.get('cdetails');
  }


  constructor(
    private firestore: CompanyService,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private auth: AuthService,
    private router: Router,
    private storage: Storage,
    private authd: Auth,
    private gmaps: GmapService,
    private renderer: Renderer2

  ) { 
    this.firestore.getcompany().subscribe(res=>{
      this.company = res;
      this.newmarker.lat = this.company.lat;
      this.newmarker.lng = this.company.lng;

    })
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      cname: ['', [Validators.required]],
      ccontact: ['', [Validators.required]],
      newmarker: [this.newmarker, []],
      cemail: ['', []],
      csize: ['', [Validators.required]],
      cprocessingtime1: ['', []],
      cprocessingtime2: ['', [Validators.required]],
      cbenefits: ['', [Validators.required]],
      companyaddress: ['', [Validators.required]],
      cdetails: ['', [Validators.required]],
    });
    
  }

  ngAfterViewInit(){
    this.loadMapCurrent();
  }

  async editcompany() {

    const loading = await this.loadingController.create({
      spinner: "dots",
      message: "Adding up!"
    });    await loading.present();
    await loading.present();
    const employer = await this.firestore.editcompany(this.credentials.value);

    if (this.selecteditemx != null){
      const generateunique = `${new Date().getTime()}_${this.filename}`;
      const fileStoragePath = `filesStorage/employer/${this.authd.currentUser.uid}/company.png`;
      const storageRef = ref(this.storage, fileStoragePath);
      const uploadfile = await uploadBytes(storageRef, this.selecteditemx);
      const fileUrl = await getDownloadURL(storageRef);
      await this.firestore.editcompanylogo(fileUrl);
      }

    
    await loading.dismiss();

    if (employer) {
      this.router.navigateByUrl('/companyprofile', { replaceUrl: true });
      this.showAlert('Edit success', 'Data updated!');

        } else {
      this.showAlert('Edit failed', 'Please try again!');
    }
  }

  async upload(event: any){

    this.fileevent = event;
    const selecteditem = event.target.files
    this.selecteditemx = selecteditem.item(0)
    this.filename  = this.selecteditemx.name
    this.filesize  = this.selecteditemx.size;


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

      this.firestore.getcompany().subscribe(async res=>{
        this.company = res;
       

      let googleMaps: any = await this.gmaps.loadGoogleMaps();
      this.googleMaps = googleMaps;
      const mapEl = this.mapElementRef.nativeElement;
      const location = new googleMaps.LatLng(this.company.lat, this.company.lng);
      this.map =  new googleMaps.Map(mapEl,{
        center: location,
        zoom: 12,
        mapTypeId: 'terrain',
        disableDefaultUI: true,
      }); 

      this.map.setCenter({lat: this.company.lat, lng: this.company.lng});
      this.renderer.addClass(mapEl, 'visible');
      this.addMarker({lat: this.company.lat, lng: this.company.lng});
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
        this.company.companyaddress = res.results[0].formatted_address;
        
    
      
       });

    });
  }

}
