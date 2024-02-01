import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelefoneEditComponent } from './telefone-edit.component';

describe('TelefoneEditComponent', () => {
  let component: TelefoneEditComponent;
  let fixture: ComponentFixture<TelefoneEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TelefoneEditComponent]
    });
    fixture = TestBed.createComponent(TelefoneEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
