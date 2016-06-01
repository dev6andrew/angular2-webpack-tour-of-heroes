import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-heroes',
  template: require('./heroes.component.html'),
  styles: [require('./heroes.component.scss')]
})

export class HeroesComponent implements OnInit {
  selectedHero: Hero;
  heroes: Hero[];

  constructor(
    private heroService: HeroService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  goToDetail(): void {
    this.router.navigate(['detail', this.selectedHero.id]);
  }

  private getHeroes(): void {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes);
  }
}
