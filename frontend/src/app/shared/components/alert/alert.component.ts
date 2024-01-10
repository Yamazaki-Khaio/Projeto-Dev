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
  @Input() alertType: string = 'success';

  constructor(private alertConfig: NgbAlertConfig) {

  }
  ngOnInit(): void {
    this.configureAlerts();



  }


  private configureAlerts() {
    this.alertConfig.dismissible = true;
    this.alertConfig.type = 'info';
    this.alertMessage = 'A simple alert—check it out!';
  }

  closeAlert() {
    this.configureAlerts();

  }
}
