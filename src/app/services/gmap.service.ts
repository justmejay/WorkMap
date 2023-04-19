import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface MapboxOutput {
  attribution: string;
  features: Feature[];
  predictions: Feature[];
  results: any;
  query: [];
}

export interface Feature {
  place_name: string;

}

@Injectable({
  providedIn: 'root'
})
export class GmapService {

  constructor(
    private http: HttpClient,
  ) { }


  search_map(query: string):Observable<MapboxOutput> {
    console.log(query);
    const url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=';
    return this.http.get(url + query + '&types=geocode|establishment&key='
    + environment.google) as Observable<MapboxOutput>
    
  }

  geocode(query: string):Observable<MapboxOutput> {
    console.log(query);
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?place_id=';
    return this.http.get(url + query + '&key='
    + environment.google) as Observable<MapboxOutput>
    
  }

  rgeocode(lat: number, lng: number):Observable<MapboxOutput> {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
    return this.http.get(url + `${lat},${lng}` + '&key='
    + environment.google) as Observable<MapboxOutput>
    
  }

  geocodeinput(query: any):Observable<MapboxOutput> {
    console.log(query)
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
    return this.http.get(url + query.input + '&components=country:PH&key='
    + environment.google) as Observable<MapboxOutput>
    
  }

  

}
