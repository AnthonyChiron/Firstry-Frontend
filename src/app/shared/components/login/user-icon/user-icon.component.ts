import { PaymentService } from './../../../data/PaymentService/payment.service';
import {
  Component,
  EventEmitter,
  HostListener,
  ElementRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { th } from 'date-fns/locale';
import { OrganizersService } from 'src/app/shared/data/OrganizersService/organizers.service';
import { AuthService } from 'src/app/shared/services/AuthService/auth.service';
import { ScreenSizeService } from 'src/app/shared/services/screenSize/screen-size.service';

@Component({
  selector: 'user-icon',
  templateUrl: './user-icon.component.html',
  styleUrls: ['./user-icon.component.scss'],
})
export class UserIconComponent {
  user;
  isLoggedIn: boolean = false;
  toggleAccountOption: boolean = true;
  isModalOpen: boolean = false;
  indexLogin: number = 0;
  isMobile: boolean = false;
  alert: boolean = false;

  constructor(
    private authService: AuthService,
    private elementRef: ElementRef,
    private router: Router,
    private _screenSizeService: ScreenSizeService,
    private paymentService: PaymentService,
    private organizerService: OrganizersService
  ) {}

  ngOnInit(): void {
    this._screenSizeService.isMobile$.subscribe((result) => {
      this.isMobile = result;
    });
    this.authService.isLoggedIn().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      this.user = this.authService.getCurrentUser();
      if (this.authService.isCurrentUserOrganizer())
        this.organizerService
          .isContestPaymentEnabledByOrganizerId(this.user.organizer._id)
          .subscribe((res) => {
            console.log(res);
            if (res)
              this.paymentService.isStripeAccountUsable().subscribe((res) => {
                console.log(res);
                this.alert = !res;
              });
          });
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  openModal(index) {
    this.indexLogin = index;
    this.isModalOpen = true;
    console.log(this.isModalOpen);
  }

  @HostListener('document:mouseover', ['$event'])
  clickOutside(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.toggleAccountOption = true;
    }
  }
}
