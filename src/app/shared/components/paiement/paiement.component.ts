import {
  Component,
  ViewChild,
  OnInit,
  Input,
  signal,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  StripeService,
  StripeCardComponent,
  StripePaymentElementComponent,
  injectStripe,
  StripeFactoryService,
} from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
  StripeCardElementChangeEvent,
  StripeCardNumberElementOptions,
  StripeCardExpiryElementOptions,
  StripeCardCvcElementOptions,
  PaymentRequestOptions,
  StripePaymentElementOptions,
  CssFontSource,
} from '@stripe/stripe-js';
import { inject } from '@angular/core/testing';
import { FormBuilder, Validators } from '@angular/forms';
import { PaymentService } from '../../data/PaymentService/payment.service';

@Component({
  selector: 'paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.scss'],
})
export class PaiementComponent implements OnInit {
  @ViewChild(StripePaymentElementComponent)
  paymentElement!: StripePaymentElementComponent;
  @Input()
  amount: number;
  isInit: boolean = false;
  @Output() paymentSucceeded: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() paymentFailed: EventEmitter<boolean> = new EventEmitter<boolean>();

  stripe = this.factoryService.create(
    'pk_test_51OPhx3ExeV2TEn3k0EWYu7LkqusSy8cewkqOMeV6ydwt6ICp84mIxzw2oPzyh8v3awLSP9ymlJqrx2ysjS00TKlU00yuzgNMzN'
  );

  elementsOptions: StripeElementsOptions = {
    locale: 'fr',
    appearance: {
      theme: 'flat',
    },
  };

  paymentElementOptions: StripePaymentElementOptions = {
    layout: {
      type: 'tabs',
      defaultCollapsed: false,
      radios: false,
      spacedAccordionItems: false,
    },
  };

  paying = signal(false);

  constructor(
    private paymentService: PaymentService,
    private factoryService: StripeFactoryService
  ) {}

  ngOnInit(): void {
    this.paymentService.createPayment(this.amount * 10).subscribe((result) => {
      console.log(result);

      this.elementsOptions = {
        // passing the client secret obtained from the server
        clientSecret: result.clientSecret,
      };
      this.isInit = true;
      console.log(this.elementsOptions);
    });
  }

  pay() {
    this.paying.set(true);

    this.stripe
      .confirmPayment({
        elements: this.paymentElement.elements,
        redirect: 'if_required',
      })
      .subscribe((result) => {
        this.paying.set(false);
        console.log('Result', result);
        if (result.error) {
          // Show error to your customer (e.g., insufficient funds)
        } else {
          // The payment has been processed!
          if (result.paymentIntent.status === 'succeeded') {
            this.paymentSucceeded.emit(true);
          } else {
            this.paymentFailed.emit(true);
          }
        }
      });
  }
}
