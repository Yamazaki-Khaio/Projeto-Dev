import { Component, Input } from '@angular/core';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  alertMessage: string | null = null;

  @Input() message: string = '';
  @Input() alertType: string = 'danger';

  constructor(private alertConfig: NgbAlertConfig) {

  }
  ngOnInit(): void {
    this.configureAlerts();



  }


  private configureAlerts() {
    this.alertConfig.dismissible = false;
    this.alertConfig.type = 'danger';
    this.alertType = 'danger';
    this.alertMessage = '';
  }

  closeAlert() {
    this.configureAlerts();

  }
}
