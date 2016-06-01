import { Component } from '@angular/core';
import { OnActivate, RouteSegment, Router } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-hero-detail',
  template: require('./hero-detail.component.html'),
  styles: [require('./hero-detail.component.scss')]
})

export class HeroDetailComponent implements OnActivate {
  hero: Hero;

  constructor(
    private heroService: HeroService,
    private router: Router
  ) { }

  routerOnActivate(currentRoute: RouteSegment): void {
    let id: number = +currentRoute.getParam('id');
    this.heroService.getHero(id)
      .then(hero => this.hero = hero);
  }

  goBack(): void {
    // Does not load data in heroes list when navigating back using Safari
    // Reference: https://github.com/angular/angular/issues/7722
    window.history.back();
  }
}
