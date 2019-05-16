import { Component, OnInit, Input } from '@angular/core';
import { TransportService } from '../services/transport.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() error:any;

  constructor(private transportService:TransportService) { }

  ngOnInit() {
    this.searchError()
  }

  searchError() {
    if (this.error){
      console.log ('error found')
    }
    if (this.transportService.error) {
      console.log('ajax call error found')
    }

  }

}
