import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { ApplicationService } from 'src/app/services/application.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ToastController} from '@ionic/angular';
import { GmapService } from 'src/app/services/gmap.service';
import { ProfilingService } from 'src/app/services/profiling.service';

@Component({
  selector: 'app-myapplicationscompany',
  templateUrl: './myapplicationscompany.page.html',
  styleUrls: ['./myapplicationscompany.page.scss'], 
})
export class MyapplicationscompanyPage implements OnInit {

  job: any = [];
  cdetails: any = [];
  center: any = {lat: 17.6022248,lng: 121.6768865};
  map: any;
  googleMaps;
  @ViewChild('map', {static: true}) mapElementRef: ElementRef;
  directionsDisplay: any;
  directionsService: any;
  cdata: any;
  fcdata: any =[];
  fpdata: any = [];
  source_marker: any;
  work_marker: any;

  constructor(
    private firestore: CompanyService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,
    private app: ApplicationService,
    private maps: GmapService,
    private rendere: Renderer2,
    private profile: ProfilingService
  ) { 

    this.activatedRoute.queryParams.subscribe((params) =>{

      this.job = params;
      console.log(this.job.uid)

      this.app.getcompanyid(this.job.uid).subscribe(res=>{
        this.cdetails = res;
        console.log(this.cdetails)

        this.profile.getcoords().subscribe(res=>{
          this.fpdata = res;
          // console.log(this.fpdata)
          this.draw();

        });
        
      })
  
      })
  }

  ngOnInit() {
  }

  async loadMap(){

    try {
      let googleMaps: any = await this.maps.loadGoogleMaps();
      this.googleMaps = googleMaps;
      const mapEl = this.mapElementRef.nativeElement;
      this.map = new googleMaps.Map(mapEl, {
        center: { lat: this.center.lat, lng: this.center.lng },
        disableDefaultUI: true,
        zoom: 17,
        mapTypeId: 'roadmap'

      });
      this.directionsService = new googleMaps.DirectionsService;
      this.directionsDisplay = new googleMaps.DirectionsRenderer;
      this.directionsDisplay = new googleMaps.DirectionsRenderer();




      this.rendere.addClass(mapEl, 'visible');
    }catch(e){
      console.log(e)
    }

  }

    
  ngAfterViewInit(){
    this.loadMap();
  }

  
  async draw(){
    const load = await this.loadingController.create({
      message: 'Calculating',
      spinner: 'dots'
    });
    await load.present();

    let googleMaps: any = this.googleMaps;
    this.source_marker = new googleMaps.Marker({
      map: this.map,
      position: {lat: this.fpdata.clat, lng: this.fpdata.clng},
      icon: 'https://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=home|ff0000'
    });


    this.work_marker = new googleMaps.Marker({
      map: this.map,
      position: {lat: this.cdetails.lat, lng: this.cdetails.lng},
      icon: 'https://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=corporate|00FFFF'
    });








    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setOptions({
      polylineOptions: {
        strokeWeight: 3,
        strokeOpacity: 1,
        strokeColor: 'blue'
      },
      suppressMarkers: true
    });

    this.directionsService.route({
      origin: {lat: this.fpdata.clat, lng: this.fpdata.clng},
      destination: {lat: this.cdetails.lat, lng: this.cdetails.lng},
      travelMode: 'DRIVING',
      provideRouteAlternatives: false
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
        console.log('response: ', response);
        const directionsData = response.routes[0].legs[0];
        const duration = directionsData.duration;
        const test = directionsData.distance;
        console.log(test);

        const value =  directionsData.distance.value;



      } else {
        console.log(status);
      }
    });

    await load.dismiss();

  }
  

}
