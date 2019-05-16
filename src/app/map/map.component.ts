import { Component, ViewChild, OnInit, Input } from '@angular/core';

import { } from 'googlemaps';

import { XmlToJsonComponent } from '../xml-to-json/xml-to-json.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

   @Input() coordinates: any;
   @Input() oneCoordinate: any;

   center: Array<number> = [52.520008, 13.404954];
   zoom: number = 10;
   previousCenter = null;
   currentCoordinate:any = null;
   markers:Array<any> = [];
   infowindow:any = null;




  constructor() { }

  // Google map elements
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  ngOnInit() {
    setTimeout(() => {
      // TODO load map in service
      this.loadMap();
      // google didn't exist previously
      this.previousCenter = new google.maps.LatLng(null, null);
    }, 1000);
  }
  loadMap() {
    console.log(this.zoom)
    var mapProp = {
      center: new google.maps.LatLng(this.center[0], this.center[1]),
      zoom: this.zoom,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

  }
  startMarkers() {
    this.clearMarkers();
    setTimeout(() => {this.getCoordinates();}, 1000)
  }

  clearMarkers() {
    if (this.markers) {
      this.setMapOnAll(null);
      this.coordinates = null;
    }
  }
  //  erase previous markers if we pass null. function from https://developers.google.com/maps/documentation/javascript/examples/marker-remove
  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }

  getCoordinates() {
    console.log(this.coordinates)
    let map = this.map
    let newCoordinates = this.coordinates
   if (newCoordinates) {
     for (let coordinate of newCoordinates) {
       let marker = new google.maps.Marker({
         position: coordinate,
         map: map,
         title: 'Hello World!'
       });
      // open an infowindow on click
      console.log(marker)
      marker.addListener('click', function() {
       // initialize the infowindow for the clearMarkers
        console.log('click!')
        this.infowindow = new google.maps.InfoWindow({
           content:  '<div id="content">'+
              '<div id="siteNotice">'+
              '</div>'+
              '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
              '<div id="bodyContent">'+
              '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
              'sandstone rock formation in the southern part of the '+
              'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
              'south west of the nearest large town, Alice Springs; 450&#160;km '+
              '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
              'features of the Uluru - Kata Tjuta National Park. Uluru is '+
              'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
              'Aboriginal people of the area. It has many springs, waterholes, '+
              'rock caves and ancient paintings. Uluru is listed as a World '+
              'Heritage Site.</p>'+
              '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
              'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
              '(last visited June 22, 2009).</p>'+
              '</div>'+
              '</div>'
         });
        this.infowindow.open(this.map, marker);
      } );
       this.markers.push(marker);
     }
   }
 }






 clickOnHaltestelle() {
   setTimeout(() => {

     //check if we received new coordinates from the haltestelle we clicked just now
     this.oneCoordinate? this.resetMap(): console.log('no coordinates to work with') ;
   }, 1000)


 }
 resetMap() {
   let zoom = this.map.getZoom()

   this.currentCoordinate = {lat:this.oneCoordinate.lat, lng:this.oneCoordinate.lng}



  this.map.setCenter(this.currentCoordinate);
  // toggle focus on marker / broader view

  // compare current and previous coordinates to see if we just want to zoom in / out
  if (zoom === 10){
    if (this.currentCoordinate !== this.previousCenter) {
      this.map.setZoom(18)
    } else {
      this.map.setZoom(10)
    }
  }
  if (this.previousCenter) {
    // this looong line just because currentCoordinate isn't a latLng object : (
    // therefore TODO: convert currentCoordinate to latLng
    if (this.previousCenter.lat === this.oneCoordinate.lat && this.previousCenter.lng === this.oneCoordinate.lng) {
      this.map.setZoom(10)
    } else {
      this.map.setZoom(18)
    }
  }
  this.previousCenter= this.currentCoordinate;
 }

}
