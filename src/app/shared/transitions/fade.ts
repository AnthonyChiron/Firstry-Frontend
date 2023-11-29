import {
  trigger,
  animate,
  transition,
  style,
  query,
} from '@angular/animations';

export const fadeAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          left: 0,
          width: '100%',
          opacity: 0,
        }),
      ],
      { optional: true }
    ),
    query(':enter', [animate('1300ms ease', style({ opacity: 1 }))], {
      optional: true,
    }),
    query(':leave', [animate('1300ms ease', style({ opacity: 0 }))], {
      optional: true,
    }),
  ]),
]);
