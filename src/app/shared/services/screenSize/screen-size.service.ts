import { Injectable, EventEmitter, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService implements OnDestroy {
  public isMobile: boolean = false;
  public isDesktop: boolean = !this.isMobile;
  public sizeChanged: EventEmitter<boolean> = new EventEmitter();
  private resizeListener: () => void;

  constructor() {
    this.checkScreenSize();

    this.resizeListener = () => {
      this.checkScreenSize();
    };

    window.addEventListener('resize', this.resizeListener);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeListener);
  }

  private checkScreenSize(): void {
    const isMobile = window.innerWidth < 768;

    if (isMobile !== this.isMobile) {
      this.isMobile = isMobile;
      this.isDesktop = !this.isMobile;
      this.sizeChanged.emit(this.isMobile);
    }
  }
}
