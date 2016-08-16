import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, XHRBackend } from '@angular/http';

import { InMemoryBackendService, SEED_DATA } from 'angular2-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';
import { appRouting } from './app.routes';
import { DashboardComponent } from './dashboard.component';
import { HeroesModule } from './heroes';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    appRouting,
    HeroesModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: XHRBackend, useClass: InMemoryBackendService },
    {provide: SEED_DATA, useClass: InMemoryDataService }
  ]
})
export class AppModule { }
