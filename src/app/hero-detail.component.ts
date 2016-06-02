import { Component, EventEmitter, Output } from '@angular/core';
import { OnActivate, RouteSegment, Router} from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-hero-detail',
  template: require('./hero-detail.component.html'),
  styles: [require('./hero-detail.component.scss')]
})

export class HeroDetailComponent implements OnActivate {
  @Output() close: EventEmitter<Hero>;
  hero: Hero;
  navigated: boolean;
  error: any;

  constructor(
    private heroService: HeroService,
    private router: Router
  ) {
    this.close = new EventEmitter<Hero>();
    this.hero = new Hero();
    this.navigated = false;
  }

  routerOnActivate(currentRoute: RouteSegment): void {
    let id: number = +currentRoute.getParam('id');

    if (id) {
      this.navigated = true;
      this.heroService.getHero(id)
        .then(hero => this.hero = hero);
    }
  }

  goBack(savedHero: Hero = null): void {
    // Does not load data in heroes list when navigating back using Safari
    // Reference: https://github.com/angular/angular/issues/7722
    this.close.emit(savedHero);
    if (this.navigated) {
      window.history.back();
    }
  }

  save(): void {
    this.heroService.save(this.hero)
      .then(hero => {
        this.hero = hero;
        this.goBack(hero);
      })
      .catch(error => this.error = error);
  }
}
