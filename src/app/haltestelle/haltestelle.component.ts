import { Component, OnInit, Input } from '@angular/core';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-haltestelle',
  templateUrl: './haltestelle.component.html',
  styleUrls: ['./haltestelle.component.scss']
})
export class HaltestelleComponent implements OnInit {
  @Input() oneJsonResult: any;


  constructor() { }

  ngOnInit() {
    
  }


}
