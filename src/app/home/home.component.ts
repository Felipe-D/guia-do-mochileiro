import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { icon, latLng, marker, polyline, tileLayer } from 'leaflet';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  latitude = 0;
  public longitude: number = 0;
  map;
  markersLayer: any;
  loader: boolean = false;
  categories: any = require('../services/categories.json');
  results: any[] = [];

  constructor(private api: ApiService) { }

  ngOnInit() {
    console.log(this.categories)
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

    } else {
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
          // console.log(venue)
          this.createVenuesMarker(venue.location.lat, venue.location.lng, venue.name);
          // this.api.getVenueDetails(venue.id)
          //   .subscribe(detail => {
          //     this.results.push(detail.response.venue);
          //     console.log(this.results);
          //   })
        })
        this.loader = false;
      })
    this.map.setView([this.latitude, this.longitude], 100);
    // this.createMarker();
  }

  setPosition(pinpoint) {
    this.latitude = pinpoint.coords.latitude;
    this.longitude = pinpoint.coords.longitude;
  }
  // -23.6936355,-46.641580999999995

  drawMap() {
    console.log(this.latitude, this.longitude)
    this.map.setView([this.latitude, this.longitude], 13);
    this.createMarker()
  }

  createMarker() {
   let now = L.marker([this.latitude, this.longitude]).addTo(this.map)
      .bindPopup('Você está aqui.')
      .openPopup();
  // this.markersLayer = new L.FeatureGroup(null);
  //       this.markersLayer.clearLayers();
  //       this.markersLayer.addLayer(now);
  //       this.markersLayer.addTo(this.map);
  }

  createVenuesMarker(lat, long, name) {
    L.marker([lat, long]).addTo(this.map)
      .bindPopup('<span>' + name + '.</span>')
      .openPopup();
  }


}
