import { Component } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';

import { HeroService } from './hero.service';
import { HeroesComponent } from './heroes.component';
import { DashboardComponent } from './dashboard.component';
import { HeroDetailComponent } from './hero-detail.component';

@Component({
  selector: 'my-app',
  template: require('./app.component.html'),
  styles: [require('./app.component.scss')],
  directives: [ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS, HeroService]
})
@Routes([
  { path: '/heroes', component: HeroesComponent },
  { path: '/dashboard', component: DashboardComponent },
  { path: '/detail/:id', component: HeroDetailComponent },
  { path: '/', component: DashboardComponent }
])
export class AppComponent {
  title: string = 'Tour of Heroes';
}
