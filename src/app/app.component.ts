import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { HeroService } from './hero.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  directives: [ROUTER_DIRECTIVES],
  providers: [HeroService]
})
export class AppComponent {
  title: string;

  constructor() {
    this.title = 'Tour of Heroes';
  }
}
