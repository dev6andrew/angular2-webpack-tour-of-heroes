import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeroesComponent } from './heroes.component';
import { HeroListComponent } from './hero-list.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';
import { heroesRouting } from './heroes.routes';

@NgModule({
  declarations: [
    HeroesComponent,
    HeroDetailComponent,
    HeroListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    heroesRouting
  ],
  providers: [
    HeroService
  ]
})
export class HeroesModule { }
