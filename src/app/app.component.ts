import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: require('./app.component.html'),
  styles: [require('./app.component.scss')]
})

export class AppComponent {
  title: string = 'Tour of Heroes';
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };

}

export class Hero {
  id: number;
  name: string;
}
