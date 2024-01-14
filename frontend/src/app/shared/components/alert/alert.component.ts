import { Component, Input } from '@angular/core';
import { AlertService } from '../../services/alert.service';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  alertMessage = '';
  alertType = 'alert-warning';


  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertService.alert$.subscribe(({ message, type }) => {
      this.alertMessage = message;
      this.alertType = type;
    });
  }

  closeAlert(): void {
    this.alertService.closeAlert();
  }
}
