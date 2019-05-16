import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import * as xml2js from 'xml2js';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { TransportService } from '../services/transport.service';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { HaltestelleComponent } from '../haltestelle/haltestelle.component'


@Component({
  selector: 'app-xml-to-json',
  templateUrl: './xml-to-json.component.html',
  styleUrls: ['./xml-to-json.component.scss']
})
export class XmlToJsonComponent implements OnInit {
  @Output() redirect:EventEmitter<any> = new EventEmitter();
  @Output() oneCoordinate:EventEmitter<any> = new EventEmitter();
  @Output() lonelyJSON = new EventEmitter<any>();
  @Output() emitError:EventEmitter<any> = new EventEmitter();
  @Input() newConfigUrl:SearchbarComponent;

    // here are the properties
    headers: string[];
    config: any;
    result: any;
    coordinates: any;
    JSONresult:Array<any>= [];
    currentURL: string;
    oneItemId: number;
    oneJsonResult:Array<any>= [];
    lonelyCoordinate: any;
    haltestelleComponent: HaltestelleComponent
    error: any = null;

  constructor( private transportService:TransportService) {

}

  ngOnInit() {

  }


    // get transportation server's xml
    // we have to get it when the user clicks the input button
    searchButtonClicked() {
      this.coordinates = null;
      // wait for server's response from transport service first (it was also activated on click)
      setTimeout(() => {this.showConfigResponse();}, 100)
    }


    showConfigResponse() {

      // first we erase previous information
      this.config = null;
      //the service gets a new header to retrieve info
      this.transportService.getConfigResponse(this.newConfigUrl.cleanInput)

        // resp is of type `HttpResponse<Config>`
        .subscribe(
          (resp) => {


            // access the body directly
            this.config =  resp ;
            console.log(resp);
            this.convertToJSON();
          },
          // let's see if there are errors
        err => {
          console.error('Oops:', err.message);
          this.error= 'Error connecting to the server'
          this.emitError.emit(this.error);
        }
      );
    }

  convertToJSON() {
    let results = this.config;
    //console.log(this.config)
    //this converts the xml to JSON
    xml2js.parseString((results),  (err, result) => {
      // we want just the lat long , address and ID

      this.result = results
      //erase previous list of addresses
      this.JSONresult = [];


      // filter out if not in Berlin
      if (results.stopLocationOrCoordLocation) {
        for (let item of results.stopLocationOrCoordLocation) {
          item.StopLocation && item.StopLocation.name.includes('Berlin')?
            this.JSONresult.push(item)
          :
            console.log('item not located in Berlin')

        }
      } else {
        this.error= "uh-oh. We don't have any results. Try searching for something else?"
        this.emitError.emit(this.error);
      }

    })
    // JSONresult is now a list of places
    if (this.JSONresult){
      console.log(this.coordinates)
      // so we sort through the places
      for (let item of this.JSONresult) {
        // look for their names
        let name= item.StopLocation.name
        let id = item.StopLocation.id
        // and where they are (converting lat an lon to numbers)
        let thisCoordinate = {lat: +item.StopLocation.lat,  lng: +item.StopLocation.lon}
        // if no coordinates yet
        if (this.coordinates === null ) {
          this.coordinates = [thisCoordinate]
        } else {
          this.coordinates = this.coordinates.concat(thisCoordinate);
        }
      }
      console.log('emiting coordinates')
      this.redirect.emit(this.coordinates);
    }
  }

  showMyMarker(itemID){
    this.oneItemId = itemID
    // let's show this specific location on the map
    if (this.JSONresult){
      // so we sort through the places
      for (let item of this.JSONresult) {
        // look for its id
        let id = item.StopLocation.extId
        if (id === itemID) {
          this.oneJsonResult = [item]

          //change the selected item's CSS to show it on top of the modal
          let selected = document.getElementById(id);
          let previouslySelected = document.getElementsByClassName("selected")[0]
          if (previouslySelected && previouslySelected != selected) {
            previouslySelected.classList.toggle("selected");
            this.lonelyJSON.emit(item)
          }
          selected.classList.toggle("selected");

          // and where they are (converting lat an lon to numbers)
          let thisCoordinate = {lat: +item.StopLocation.lat,  lng: +item.StopLocation.lon}

          //let's put this as the only coordinate
          this.lonelyCoordinate = thisCoordinate
          this.oneCoordinate.emit(thisCoordinate);
        }
      }
    } else {
      console.log('no places found')
    }
  }


}
