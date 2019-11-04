import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://api.foursquare.com/v2/'
  private apiVs = '&v=20190425';
  private id = 'client_id=Z4AWJIBV4DVQH24FSBE0XQA12DO30YIQANUD5W4ZFUEUTGLG';
  private secret = '&client_secret=BMOX1HCZCJABFSEQEPASENKUS23KQCYUGW2TSCJ1QLWI55MI';
  constructor( private http: HttpClient) { }

  getVenues(lat:number, long:number): Observable<any>{
    let pos = '&ll='+lat+','+long;
    return this.http.get<any>(this.apiUrl+'venues/search?'+this.id+this.secret+this.apiVs+pos+'&intent=checkin&radius=800');
  }
  browseVenues(place:string): Observable<any>{
    return this.http.get<any>(this.apiUrl+'venues/search?'+this.id+this.secret+this.apiVs+'&near=sao paulo&intent=browse&radius=10000&query='+place+'&limit=100');
  }

  getVenueDetails(id:string): Observable<any>{
    return this.http.get<any>(this.apiUrl+'venues/'+id+'?'+this.id+this.secret+this.apiVs);
  }

  getVenueTips(id:string): Observable<any>{
    return this.http.get<any>(this.apiUrl+'venues/'+id+'/tips?'+this.id+this.secret+this.apiVs+'&sort=popular');
  }

  getVenuePhotos(id:string): Observable<any>{
    return this.http.get<any>(this.apiUrl+'venues/'+id+'/photos?'+this.id+this.secret+this.apiVs+'&group=venue');
  }
}
