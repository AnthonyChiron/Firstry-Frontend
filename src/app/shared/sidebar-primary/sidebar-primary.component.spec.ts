import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarPrimaryComponent } from './sidebar-primary.component';

describe('SidebarIconComponent', () => {
  let component: SidebarPrimaryComponent;
  let fixture: ComponentFixture<SidebarPrimaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarPrimaryComponent],
    });
    fixture = TestBed.createComponent(SidebarPrimaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
