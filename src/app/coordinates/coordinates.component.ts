import { Component, OnInit, Input } from '@angular/core';

import { AppComponent } from '../app.component';
import { XmlToJsonComponent } from '../xml-to-json/xml-to-json.component';

@Component({
  selector: 'app-coordinates',
  templateUrl: './coordinates.component.html',
  styleUrls: ['./coordinates.component.scss']
})
export class CoordinatesComponent implements OnInit {

  @Input() coordinates: any;

  constructor() { }

  ngOnInit() {
  }


}
