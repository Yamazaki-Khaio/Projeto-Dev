import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutLogadoComponent } from './layout-logado.component';

describe('LayoutLogadoComponent', () => {
  let component: LayoutLogadoComponent;
  let fixture: ComponentFixture<LayoutLogadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutLogadoComponent]
    });
    fixture = TestBed.createComponent(LayoutLogadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
