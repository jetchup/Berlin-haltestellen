import { Component, OnInit } from '@angular/core';

import { MapComponent } from '../map/map.component';
import { XmlToJsonComponent } from '../xml-to-json/xml-to-json.component';
import { TransportService } from '../services/transport.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private transportService:TransportService) { }

  ngOnInit() {
  }
  public searchClicked: Event;

  searchButtonClicked(event) {
    this.searchClicked = event;
    console.log(this.searchClicked)
  }

}
