import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingAssetComponent } from './waiting-asset.component';

describe('WaitingAssetComponent', () => {
  let component: WaitingAssetComponent;
  let fixture: ComponentFixture<WaitingAssetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WaitingAssetComponent]
    });
    fixture = TestBed.createComponent(WaitingAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
