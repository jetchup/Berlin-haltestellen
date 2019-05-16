import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { XmlToJsonComponent } from './xml-to-json/xml-to-json.component';
import { HaltestelleComponent } from './haltestelle/haltestelle.component';
import { Error404Component } from './error404/error404.component'

const routes: Routes = [
{ path: '', component: HomeComponent },
{ path: '', component: XmlToJsonComponent, outlet: "haltestellen" },
{ path: 'haltestelle/:id', component: HaltestelleComponent },
{ path: '**', component: Error404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {

}
