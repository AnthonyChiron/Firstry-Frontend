import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLiveAssetComponent } from './main-live-asset.component';

describe('MainLiveAssetComponent', () => {
  let component: MainLiveAssetComponent;
  let fixture: ComponentFixture<MainLiveAssetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainLiveAssetComponent]
    });
    fixture = TestBed.createComponent(MainLiveAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
