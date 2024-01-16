import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EnderecoSharedService {
  private enderecoIdSubject: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);

  constructor() { }

  setEnderecoId(enderecoId: number | null): void {
    this.enderecoIdSubject.next(enderecoId);
  }

  getEnderecoId(): Observable<number | null> {
    return this.enderecoIdSubject.asObservable();
  }
}
