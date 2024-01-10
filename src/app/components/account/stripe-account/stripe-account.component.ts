import { Router } from '@angular/router';
import { PaymentService } from './../../../shared/data/PaymentService/payment.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'stripe-account',
  templateUrl: './stripe-account.component.html',
  styleUrls: ['./stripe-account.component.scss'],
})
export class StripeAccountComponent implements OnInit {
  @Input() user: any;
  urlStripeAccount = '';
  constructor(private PaymentService: PaymentService, private router: Router) {}

  ngOnInit(): void {
    this.PaymentService.createLoginLink().subscribe((data) => {
      console.log(data);
    });
  }

  test() {
    this.router.navigateByUrl(this.urlStripeAccount);
  }
}
