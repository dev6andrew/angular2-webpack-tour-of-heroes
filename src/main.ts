import {enableProdMode} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';

import {AppComponent} from './app/';

import './styles/main.scss';

if (ENV === 'production') {
  enableProdMode();
}

bootstrap(AppComponent);
