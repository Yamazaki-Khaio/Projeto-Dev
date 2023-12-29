import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SituacaoComponent } from './situacao.component';

describe('SituacaoComponent', () => {
  let component: SituacaoComponent;
  let fixture: ComponentFixture<SituacaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SituacaoComponent]
    });
    fixture = TestBed.createComponent(SituacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
