import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertSubject = new BehaviorSubject<{ message: string; type: string }>({ message: '', type: 'alert-warning' });
  alert$: Observable<{ message: string; type: string }> = this.alertSubject.asObservable();

  showAlert(message: string, alertType: string = 'alert-warning'): void {
    this.alertSubject.next({ message, type: alertType });
  }

  closeAlert(): void {
    this.alertSubject.next({ message: '', type: 'alert-warning' });
  }
}
