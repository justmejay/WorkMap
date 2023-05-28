import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 

export interface MapboxOutput {
  attribution: string;
  features: Feature[];
  predictions: Feature[];
  results: any;
  query: [];
  rows: any;
}

export interface Feature {
  place_name: string;

}

@Injectable({
  providedIn: 'root'
})
export class GmapService {
  header: any = [{
    headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
    })
}];

  constructor(
    private http: HttpClient
  ) { }

   



  loadGoogleMaps(): Promise<any> {
    const win = window as any;
    const gModule = win.google;
    if(gModule && gModule.maps) {
     return Promise.resolve(gModule.maps);
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src =
        'https://maps.googleapis.com/maps/api/js?key=' +
        environment.google_maps_api_key;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadedGoogleModule = win.google;
        if(loadedGoogleModule && loadedGoogleModule.maps) {
          resolve(loadedGoogleModule.maps);
        } else {
          reject('Google Map SDK is not Available');
        }
      };
    });
  }


  search_map(query: string):Observable<MapboxOutput> {
    console.log(query);
    const url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=';
    return this.http.get(url + query + '&types=geocode|establishment&components=country:ph&key='
    + environment.google_maps_api_key) as Observable<MapboxOutput>
    
  }

  geocode(query: string):Observable<MapboxOutput> {
    console.log(query);
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?place_id=';
    return this.http.get(url + query + '&key='
    + environment.google_maps_api_key) as Observable<MapboxOutput>
    
  }

  rgeocode(lat: any, lng: any):Observable<MapboxOutput> {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
    return this.http.get(url + `${lat},${lng}` + '&key='
    + environment.google_maps_api_key) as Observable<MapboxOutput>
    
  }

  geocodeinput(query: any):Observable<MapboxOutput> {
    console.log(query)
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
    return this.http.get(url + query.input + '&components=country:PH&key='
    + environment.google_maps_api_key) as Observable<MapboxOutput>
    
  }

  distancecompute(lat: any, lng: any, olat: any, olng: any):Observable<MapboxOutput> {
    const url = 'https://maps.googleapis.com/maps/api/distancematrix/json?destinations=';
    return this.http.get(url + `${lat},${lng}`+`&origins=`+  `${olat},${olng}` + '&key='
    + environment.google_maps_api_key) as Observable<MapboxOutput>
  }




}
