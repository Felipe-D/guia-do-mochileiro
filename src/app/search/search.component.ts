import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import * as L from "leaflet";
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BackApiService } from '../services/back-api.service';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  latitude = 0;
  public longitude: number = 0;
  map;
  loader: boolean = false;
  results: any[] = [];
  searchModel: string = null;
  cityModel: string = null;
  details: object = null;
  modalRef: BsModalRef;

  constructor(
    private api: ApiService,
    private back: BackApiService, 
    private route: ActivatedRoute,
    private modalService: BsModalService) { }

  ngOnInit() {
    
    console.log(this.route.snapshot.params.item)


    this.map = L.map('map');
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        // navigator.geolocation.watchPosition(
        // this.map = L.map('map').locate();
        (position: Position) => {
          this.setPosition(position);
          this.drawMap();
        },
        (error: PositionError) => console.log(error));

        if(this.route.snapshot.params.item){
          this.searchModel = this.route.snapshot.params.nome;
          this.browseByCategory();
        }

    } 
    else {
      console.log('Cant open geolocation');
    }

  }
  moveMap() {
    this.loader = true;

    // this.latitude = -23.5566262;
    // this.longitude = -46.6588142;
    this.latitude = -23.555131129904332
    this.longitude = -46.65814161300659
    this.api.getVenues(this.latitude, this.longitude)
      .subscribe(venues => {
        this.results = venues.response.venues;
        venues.response.venues.map(venue => {
          this.createVenuesMarker(venue.location.lat, venue.location.lng, venue.name);
        })
        this.loader = false;
      })
    this.map.setView([this.latitude, this.longitude], 100);
  }

  setPosition(pinpoint) {
    this.latitude = pinpoint.coords.latitude;
    this.longitude = pinpoint.coords.longitude;
  }
  // -23.6936355,-46.641580999999995
  drawMap() {
    console.log(this.latitude, this.longitude)
    this.map.setView([this.latitude, this.longitude], 13);
    this.createMarker();
  }

  createMarker() {
    L.marker([this.latitude, this.longitude]).addTo(this.map)
      .bindPopup('Você está aqui.')
      .openPopup();
  }

  createVenuesMarker(lat, long, name) {
    L.marker([lat, long]).addTo(this.map)
      .bindPopup('<span>' + name + '.</span>')
      .openPopup();
  }
  cleanMarkers(){
    this.map.eachLayer(
      vetor => {
        if(!vetor.options.attribution){
          this.map.removeLayer(vetor);
        }
      }
    );
  }
  getDetails(id:string, modal:TemplateRef<any>){
    this.api.getVenueDetails(id)
      .subscribe(detail => {
        console.log(detail.response.venue);
        this.details = detail.response.venue;
        
        this.openModal(modal);
        let body = { "placement": detail.response.venue.name,
        "accessDate": new Date(),
        "placeId": detail.response.venue.id
        }
        console.log(body)
        this.back.postHistories(body).subscribe(res => {
          console.log(res);
        });
              // this.results.push(detail.response.venue);
              // console.log(this.results);
      })
  }
  browse(){
    console.log(this.searchModel)
    this.api.browseVenues(this.cityModel,this.searchModel)
      .subscribe(venues => {
        this.results = venues.response.venues;
        console.log(this.results)
        this.cleanMarkers();

        venues.response.venues.map(venue => {
          this.createVenuesMarker(venue.location.lat, venue.location.lng, venue.name);
        })
        this.loader = false;
      })
  }
  browseByCategory(){
    console.log(this.searchModel)
    this.api.getVenuesbyCategory(this.searchModel)
      .subscribe(venues => {
        this.results = venues.response.venues;
        console.log(this.results)
        this.cleanMarkers();
        venues.response.venues.map(venue => {
          this.createVenuesMarker(venue.location.lat, venue.location.lng, venue.name);
          // this.api.getVenueDetails(venue.id)
          //   .subscribe(detail => {
          //     this.results.push(detail.response.venue);
          //     console.log(this.results);
          //   })
        })
        this.loader = false;
      })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { backdrop: true, keyboard: true });
  }
  getPhoto(prefix,sufix){
    return prefix+"300"+sufix;
  }
}
