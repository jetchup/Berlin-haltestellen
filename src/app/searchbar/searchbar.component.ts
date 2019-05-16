import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { TransportService } from '../services/transport.service'
import { XmlToJsonComponent } from '../xml-to-json/xml-to-json.component'


@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
  providers: [TransportService]
})
export class SearchbarComponent implements OnInit {
  @Output() searchClicked = new EventEmitter<Event>();
  @Output() newConfigUrl = new EventEmitter<string>();

  userInput:string = ''

  cleanInput:string = '';

  configUrl:string = 'http://demo.hafas.de/openapi/vbb-proxy/location.name?accessId=mjcorreahudson-46cd-85b5-46f26bc82d14'

  constructor(private transportService:TransportService) {
  }

  ngOnInit() {
  }

  @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
      if(event && event.keyCode === 13){
          this.givenInput();
      }
    }

  givenInput() {
    // we want to convert the server's response to JSON
    this.searchClicked.emit(event);

    let input = document.getElementsByTagName('input')[0].value
    // from https://stackoverflow.com/questions/3780696/javascript-string-replace-with-regex-to-strip-off-illegal-characters
      if (input){
      this.userInput = input.trim()
      this.cleanInput = this.userInput.replace(/[|&;$%@"<>()+,]/g, "")
      console.log(this.cleanInput)
      this.urlOptions()

    }
  }
    urlOptions() {
      // Add the input parameter to the url, the S is to get stations only
      let modifiedUrl = this.cleanInput

      this.newConfigUrl.emit(modifiedUrl);
    }






}
