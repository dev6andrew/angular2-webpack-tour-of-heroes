import { Injectable } from '@angular/core';

import {Hero} from './hero';
import {HEROES} from './mock-heroes';

@Injectable()
export class HeroService {
  getHeroes(): Promise<Hero[]> {
    return Promise.resolve(HEROES);
  }

  getHero(id: number): Promise<Hero> {
    return Promise.resolve(HEROES)
      .then(heroes => {
        return heroes.filter(hero => hero.id === id)[0];
      });
  }
}
