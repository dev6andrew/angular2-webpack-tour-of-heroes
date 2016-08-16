import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Hero } from './hero.model';
import { HeroService } from './hero.service';

@Component({
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent implements OnInit {
  selectedHero: Hero;
  heroes: Hero[];
  addingHero: boolean;
  error: any;

  constructor(
    private heroService: HeroService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.addingHero = false;
  }

  goToDetail(): void {
    this.router.navigate([this.selectedHero.id], {relativeTo: this.route});
  }

  addHero(): void {
    this.addingHero = true;
    this.selectedHero = null;
  }

  close(savedHero: Hero): void {
    this.addingHero = false;
    if (savedHero) {
      this.getHeroes();
    }
  }

  delete(hero: Hero, event: any): void {
    event.stopPropagation();
    this.heroService
      .delete(hero)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) {
          this.selectedHero = null;
        }
      })
      .catch(error => this.error = error);
  }

  private getHeroes(): void {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes)
      .catch(error => this.error = error);
  }
}
