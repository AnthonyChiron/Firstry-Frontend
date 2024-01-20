import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  private isMobileSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private screenWidthSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(window.innerWidth);
  public isMobile$: Observable<boolean> = this.isMobileSubject.asObservable();
  public screenWidth$: Observable<number> =
    this.screenWidthSubject.asObservable();

  constructor() {
    this.checkScreenSize();

    window.addEventListener('resize', () => {
      this.checkScreenSize();
    });
  }

  private checkScreenSize(): void {
    const isMobile = window.innerWidth < 768;

    this.isMobileSubject.next(isMobile);
    this.screenWidthSubject.next(window.innerWidth);
  }
}
