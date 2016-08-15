import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero.model';
import { HeroService } from './hero.service';
import { HeroDetailComponent } from './hero-detail.component';

@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
  directives: [HeroDetailComponent]
})
export class HeroesComponent implements OnInit {
  selectedHero: Hero;
  heroes: Hero[];
  addingHero: boolean;
  error: any;

  constructor(
    private heroService: HeroService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.addingHero = false;
  }

  goToDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
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
