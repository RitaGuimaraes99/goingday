import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  authenticated = false;
  
  public appPages = [
    { title: 'Home', url: '/folder/home', icon: 'home' },
    { title: 'Plan Trip', url: './viagem', icon: 'person' }, 
    //{ title: 'My Trips', url: './viagens-criadas', icon: 'airplane' },
    { title: 'Profile', url: './perfil', icon: 'person' }
  ];

  constructor(private authService: AuthService) {
    this.authService.authenticated$.subscribe((authenticated) => {
      this.setAuthenticationStatus(authenticated);
    })
  }

  ngOnInit() {
  }

  private setAuthenticationStatus(authenticated: boolean) {
    this.authenticated = authenticated;
  }
}
