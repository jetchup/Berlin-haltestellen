import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { XmlToJsonComponent } from './xml-to-json/xml-to-json.component';
import { CoordinatesComponent } from './coordinates/coordinates.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { AppRoutingModule } from './app-routing.module';
import { MapComponent } from './map/map.component';
import { HaltestelleComponent } from './haltestelle/haltestelle.component';
import { Error404Component } from './error404/error404.component';
import { HomeComponent } from './home/home.component';
import { ModalComponent } from './modal/modal.component';
import { PasswordsComponent } from './passwords/passwords.component';

@NgModule({
  declarations: [
    AppComponent,
    XmlToJsonComponent,
    CoordinatesComponent,
    SearchbarComponent,
    MapComponent,
    HaltestelleComponent,
    Error404Component,
    HomeComponent,
    ModalComponent,
    PasswordsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    RouterModule,
    AppRoutingModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
