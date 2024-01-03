import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IconsService {
  private iconBaseUrl = 'assets/icons/';


  constructor() { }

  getIconUrl(iconName: string): string {
    return `${this.iconBaseUrl}${iconName}.svg`;
  }
}
