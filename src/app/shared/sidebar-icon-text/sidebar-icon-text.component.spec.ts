import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarIconTextComponent } from './sidebar-icon-text.component';

describe('SidebarIconTextComponent', () => {
  let component: SidebarIconTextComponent;
  let fixture: ComponentFixture<SidebarIconTextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarIconTextComponent]
    });
    fixture = TestBed.createComponent(SidebarIconTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
