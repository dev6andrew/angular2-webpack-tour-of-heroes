import { RouterConfig } from '@angular/router';

import { HeroesComponent } from './heroes.component';
import { DashboardComponent } from './dashboard.component';
import { HeroDetailComponent } from './hero-detail.component';

export const routes: RouterConfig = [
  { path: '/heroes', component: HeroesComponent },
  { path: '/dashboard', component: DashboardComponent },
  { path: '/detail/:id', component: HeroDetailComponent },
  { path: '', redirectTo: '/dashboard' }
];
