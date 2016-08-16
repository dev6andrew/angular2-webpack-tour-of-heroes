import { RouterModule, RouterConfig } from '@angular/router';

import { HeroesComponent } from './heroes.component';
import { HeroListComponent } from './hero-list.component';
import { HeroDetailComponent } from './hero-detail.component';

const routes: RouterConfig = [
  {
    path: 'heroes',
    component: HeroesComponent,
    children: [
      { path: '', component: HeroListComponent },
      { path: ':id', component: HeroDetailComponent }
    ]
  }
];

export const heroesRouting = RouterModule.forChild(routes);
