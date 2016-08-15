import { Component, EventEmitter, Output, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Hero } from './hero.model';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit, OnDestroy {
  @Output() close: EventEmitter<Hero>;
  hero: Hero;
  private navigated: boolean;
  private error: any;
  private heroId: Observable<number>;
  private heroIdSubscription: Subscription;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute
  ) {
    this.close = new EventEmitter<Hero>();
    this.heroId = this.route.params.map(params => +params['id']);
  }

  ngOnInit(): void {
    this.heroIdSubscription = this.heroId.subscribe(id => {
      if (id) {
        this.navigated = true;
        this.heroService.getHero(id)
          .then(hero => this.hero = hero);
      } else {
        this.navigated = false;
        this.hero = new Hero();
      }
    });
  }

  ngOnDestroy(): void {
    this.heroIdSubscription.unsubscribe();
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
