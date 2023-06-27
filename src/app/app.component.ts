import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/folder/home', icon: 'home' },
    { title: 'Plan Trip', url: './viagem', icon: 'add-circle' },
    { title: 'My Trips', url: './viagens-criadas', icon: 'airplane' },
    { title: 'Saved Spots', url: './saved-locais', icon: 'pin' },
    { title: 'Profile', url: './perfil', icon: 'person' },
  ];
  constructor() {}
}
