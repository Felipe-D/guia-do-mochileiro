import { Component, ViewChild } from '@angular/core';
// import { } from 'googlemaps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'guia-v1';
  // @ViewChild('gmap') gmapElement: any;
  // map: google.maps.Map;


  ngOnInit() {


    // var mapProp = {
    //   center: new google.maps.LatLng(18.5793, 73.8143),
    //   zoom: 15,
    //   mapTypeId: google.maps.MapTypeId.ROADMAP
    // };
    // this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    // let service = new google.maps.places.PlacesService(this.map);
    // service.nearbySearch(
    //   {location: mapProp.center, radius: 500, type: 'store'},
    //   function(results, status, pagination) {
    //     console.log(results,status,pagination);

    //     // createMarkers(results);
    //   });
  //   var sydney = new google.maps.LatLng(-33.867, 151.195);

  // let infowindow = new google.maps.InfoWindow();

  // this.map = new google.maps.Map(
  //     this.gmapElement.nativeElement, {center: sydney, zoom: 15});

  // var request = {
  //   query: 'Museum of Contemporary Art Australia',
  //   fields: ['name', 'geometry'],
  // };

  // var service = new google.maps.places.PlacesService(this.map);

  // service.findPlaceFromQuery(request, function(results, status) {
    
  //   console.log(status)
  //   if (status === google.maps.places.PlacesServiceStatus.OK) {
  //     for (var i = 0; i < results.length; i++) {
  //       console.log(results[i])
  //       // createMarker(results[i]);
  //     }
  //     this.map.setCenter(results[0].geometry.location);
  //   }
  // });

  // }
  // setMapType(mapTypeId: string) {
  //   this.map.setMapTypeId(mapTypeId)    
  // }

  // setCenter(e:any){
  //   e.preventDefault();
  //   this.map.setCenter(new google.maps.LatLng(this.latitude, this.longitude));
  // }
  }
}
