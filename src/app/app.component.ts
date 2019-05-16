import { Component, ViewChild, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { XmlToJsonComponent } from './xml-to-json/xml-to-json.component';
import { MapComponent } from './map/map.component'

import { } from 'googlemaps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:  [  ]
})

export class AppComponent implements OnInit {

  title = 'Berlin Stations';
  coordinates: any;

  constructor ( private http:HttpClient ) {}

  ngOnInit() {
    
  }

}
