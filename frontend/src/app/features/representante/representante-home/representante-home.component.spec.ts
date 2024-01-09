import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepresentanteHomeComponent } from './representante-home.component';

describe('RepresentanteHomeComponent', () => {
  let component: RepresentanteHomeComponent;
  let fixture: ComponentFixture<RepresentanteHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepresentanteHomeComponent]
    });
    fixture = TestBed.createComponent(RepresentanteHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
