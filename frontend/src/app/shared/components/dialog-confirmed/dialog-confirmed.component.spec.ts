import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmedComponent } from './dialog-confirmed.component';

describe('DialogConfirmedComponent', () => {
  let component: DialogConfirmedComponent;
  let fixture: ComponentFixture<DialogConfirmedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogConfirmedComponent]
    });
    fixture = TestBed.createComponent(DialogConfirmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
