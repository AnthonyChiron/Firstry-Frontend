import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesNavigationComponent } from './categories-navigation.component';

describe('CategoriesNavigationComponent', () => {
  let component: CategoriesNavigationComponent;
  let fixture: ComponentFixture<CategoriesNavigationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriesNavigationComponent]
    });
    fixture = TestBed.createComponent(CategoriesNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
