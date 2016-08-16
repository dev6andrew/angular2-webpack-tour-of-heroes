import { RouterModule, RouterConfig } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

const routes: RouterConfig = [
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

export const appRouting = RouterModule.forRoot(routes);
