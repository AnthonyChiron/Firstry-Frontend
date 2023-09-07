import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarSecondaryComponent } from './sidebar-secondary.component';

describe('SidebarIconTextComponent', () => {
  let component: SidebarSecondaryComponent;
  let fixture: ComponentFixture<SidebarSecondaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarSecondaryComponent],
    });
    fixture = TestBed.createComponent(SidebarSecondaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
