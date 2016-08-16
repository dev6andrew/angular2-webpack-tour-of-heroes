import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HeroService, Hero } from './heroes';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[];

  constructor(
    private heroService: HeroService,
    private router: Router
  ) {
    this.heroes = [];
  }

  ngOnInit(): void {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1, 5));
  }

  goToDetail(hero: Hero): void {
    this.router.navigate(['/heroes', hero.id]);
  }
}
