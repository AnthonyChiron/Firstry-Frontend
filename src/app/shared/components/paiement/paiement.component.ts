import {
  Component,
  ViewChild,
  OnInit,
  OnChanges,
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
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.scss'],
})
export class PaiementComponent implements OnInit, OnChanges {
  @ViewChild(StripePaymentElementComponent)
  paymentElement!: StripePaymentElementComponent;
  @Input() amount: number;
  @Input() clientSecret: string;
  @Output() paymentSucceeded: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() paymentFailed: EventEmitter<boolean> = new EventEmitter<boolean>();

  stripe = this.factoryService.create(environment.stripe_public_key);

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
    this.elementsOptions = {
      // passing the client secret obtained from the server
      clientSecret: this.clientSecret,
    };
  }

  ngOnChanges(): void {
    this.elementsOptions = {
      // passing the client secret obtained from the server
      clientSecret: this.clientSecret,
    };
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
