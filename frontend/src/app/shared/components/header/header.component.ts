import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent {
  constructor() {}
  Logo =
    'https://user-images.githubusercontent.com/90158519/229323866-f793144c-c11d-4326-bd73-340707257335.png';
  isLogged = false;
}
