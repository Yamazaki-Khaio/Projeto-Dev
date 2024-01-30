import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutLogoutComponent } from './layout-logout.component';

describe('LayoutLogoutComponent', () => {
  let component: LayoutLogoutComponent;
  let fixture: ComponentFixture<LayoutLogoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutLogoutComponent]
    });
    fixture = TestBed.createComponent(LayoutLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
