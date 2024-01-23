import { rolesEnum } from 'src/app/constants/rolesEnum';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryModel } from 'src/app/models/category.model';
import { ContestModel, parseContestModel } from 'src/app/models/contest.model';
import { RegistrationModel } from 'src/app/models/registration.model';
import { ContestsService } from 'src/app/shared/data/ContestsService/contests.service';
import { RegistrationsService } from 'src/app/shared/data/RegistrationsService/registrations.service';

@Component({
  selector: 'app-riders',
  templateUrl: './riders.component.html',
  styleUrls: ['./riders.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', animate('500ms ease-in-out')),
      transition('* <=> void', animate('500ms ease-in-out')),
    ]),
  ],
})
export class RidersComponent implements OnInit {
  contest: ContestModel;
  registrations: any[] = [];
  pendingApprovalRegistrations: RegistrationModel[] = [];
  selectedCategory: CategoryModel;
  selectedRegistrations: any[];

  constructor(
    private _registrationService: RegistrationsService,
    private _contestService: ContestsService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._activatedRoute.parent.params.subscribe((params) => {
      this._contestService.getById(params.contestId).subscribe((contest) => {
        this.contest = parseContestModel(contest);

        this.selectedCategory = this.contest.categories[0];
        this._registrationService
          .getRegistrationsByContestId(contest._id)
          .subscribe((result: any) => {
            // this.registrations = [
            //   {
            //     _id: '65aae4929939b79709b78e45',
            //     rider: {
            //       _id: '65a7fc5acb14f5edca134481',
            //       firstName: 'Anthony',
            //       lastName: 'CHIRON',
            //       nationality: {
            //         flags: {
            //           png: 'https://flagcdn.com/w320/fr.png',
            //           svg: 'https://flagcdn.com/fr.svg',
            //           alt: 'The flag of France is composed of three equal vertical bands of blue, white and red.',
            //         },
            //         name: {
            //           common: 'France',
            //           official: 'French Republic',
            //           nativeName: {
            //             fra: {
            //               official: 'République française',
            //               common: 'France',
            //             },
            //           },
            //         },
            //       },
            //       birthDate: '1997-06-06T00:00:00.000Z',
            //       city: 'Bordeaux',
            //       sports: ['roller'],
            //       photoUrl:
            //         'https://storage.googleapis.com/firstry-7e136.appspot.com/development/pdp/Anthony_CHIRON_2024-01-20T22%3A17%3A42.605Z.webp?GoogleAccessId=firebase-adminsdk-v4ylh%40firstry-7e136.iam.gserviceaccount.com&Expires=16447014000&Signature=ejy6y%2BiUBXsHF5OBAfEGX0JBZxFD3OHFOWHbTUxUQTZgp2AvlsvDfusrK253QGWKZtgQDVaiWxLIlJTIm4jsjd2hmDi5LuvsvpaL%2FhailEgMXWTxn79wtdwG%2FRhmNPwVutsdGs2WUGg8qWltGZHtG4l1V4Xkoq5egoy2XE4ip4T9iJZGkrOZflXkv9RNPag7vkvI2mm5RjalAjzBd0HsfRq%2FcijXS%2Fsd7ia5Jm9y6NEl2EAp7gwSRSon3iG31u%2B2AfySIQ0Tf9QUsfjz33UWgxXuQG11JXwEyPrhVhGhXUWUy%2BERb18T%2FOezptHiVDDr9E4%2Bsnnc%2B06OkdUvGokWZQ%3D%3D',
            //       __v: 0,
            //       socials: {
            //         instagram: 'anthony.chiron',
            //         twitter: '',
            //         youtube: '',
            //       },
            //     },
            //     category: {
            //       _id: '65aadee407bd9a63d9fe9d61',
            //       name: 'U18',
            //       description: 'Catégorie U18',
            //       sports: ['Roller'],
            //       maxRiders: 25,
            //       registerPrice: 20,
            //       isQualificationStep: true,
            //       contestId: '65a8f95fbc48c4bfe745890b',
            //       __v: 0,
            //     },
            //     state: 'pending_approval',
            //     contest: {
            //       _id: '65a8f95fbc48c4bfe745890b',
            //       name: 'FISE Xperience',
            //       startDate: '2024-03-15T00:00:00.000Z',
            //       endDate: '2024-03-17T00:00:00.000Z',
            //       sports: ['roller', 'trottinette', 'skate'],
            //       location: {
            //         country: 'États-Unis',
            //         postalCode: '53203',
            //         city: 'Milwaukee',
            //         address:
            //           '1111 Vel R. Phillips Ave, Milwaukee, WI 53203, États-Unis',
            //       },
            //     },
            //   },
            //   {
            //     _id: '65aae4929939b79709b78e45',
            //     rider: {
            //       _id: '65a7fc5acb14f5edca134481',
            //       firstName: 'OH MY COD',
            //       lastName: 'Un test',
            //       nationality: {
            //         flags: {
            //           png: 'https://flagcdn.com/w320/fr.png',
            //           svg: 'https://flagcdn.com/fr.svg',
            //           alt: 'The flag of France is composed of three equal vertical bands of blue, white and red.',
            //         },
            //         name: {
            //           common: 'France',
            //           official: 'French Republic',
            //           nativeName: {
            //             fra: {
            //               official: 'République française',
            //               common: 'France',
            //             },
            //           },
            //         },
            //       },
            //       birthDate: '1997-06-06T00:00:00.000Z',
            //       city: 'Bordeaux',
            //       sports: ['roller'],
            //       photoUrl:
            //         'https://storage.googleapis.com/firstry-7e136.appspot.com/development/pdp/Anthony_CHIRON_2024-01-20T22%3A17%3A42.605Z.webp?GoogleAccessId=firebase-adminsdk-v4ylh%40firstry-7e136.iam.gserviceaccount.com&Expires=16447014000&Signature=ejy6y%2BiUBXsHF5OBAfEGX0JBZxFD3OHFOWHbTUxUQTZgp2AvlsvDfusrK253QGWKZtgQDVaiWxLIlJTIm4jsjd2hmDi5LuvsvpaL%2FhailEgMXWTxn79wtdwG%2FRhmNPwVutsdGs2WUGg8qWltGZHtG4l1V4Xkoq5egoy2XE4ip4T9iJZGkrOZflXkv9RNPag7vkvI2mm5RjalAjzBd0HsfRq%2FcijXS%2Fsd7ia5Jm9y6NEl2EAp7gwSRSon3iG31u%2B2AfySIQ0Tf9QUsfjz33UWgxXuQG11JXwEyPrhVhGhXUWUy%2BERb18T%2FOezptHiVDDr9E4%2Bsnnc%2B06OkdUvGokWZQ%3D%3D',
            //       __v: 0,
            //       socials: {
            //         instagram: 'anthony.chiron',
            //         twitter: '',
            //         youtube: '',
            //       },
            //     },
            //     category: {
            //       _id: '65aadee407bd9a63d9fe9d61',
            //       name: 'U18',
            //       description: 'Catégorie U18',
            //       sports: ['Roller'],
            //       maxRiders: 25,
            //       registerPrice: 20,
            //       isQualificationStep: true,
            //       contestId: '65a8f95fbc48c4bfe745890b',
            //       __v: 0,
            //     },
            //     state: 'pending_approval',
            //     contest: {
            //       _id: '65a8f95fbc48c4bfe745890b',
            //       name: 'FISE Xperience',
            //       startDate: '2024-03-15T00:00:00.000Z',
            //       endDate: '2024-03-17T00:00:00.000Z',
            //       sports: ['roller', 'trottinette', 'skate'],
            //       location: {
            //         country: 'États-Unis',
            //         postalCode: '53203',
            //         city: 'Milwaukee',
            //         address:
            //           '1111 Vel R. Phillips Ave, Milwaukee, WI 53203, États-Unis',
            //       },
            //     },
            //   },
            //   {
            //     _id: '65aae4929939b79709b78e45',
            //     rider: {
            //       _id: '65a7fc5acb14f5edca134481',
            //       firstName: 'Test',
            //       lastName: '1',
            //       nationality: {
            //         flags: {
            //           png: 'https://flagcdn.com/w320/fr.png',
            //           svg: 'https://flagcdn.com/fr.svg',
            //           alt: 'The flag of France is composed of three equal vertical bands of blue, white and red.',
            //         },
            //         name: {
            //           common: 'France',
            //           official: 'French Republic',
            //           nativeName: {
            //             fra: {
            //               official: 'République française',
            //               common: 'France',
            //             },
            //           },
            //         },
            //       },
            //       birthDate: '1997-06-06T00:00:00.000Z',
            //       city: 'Bordeaux',
            //       sports: ['roller'],
            //       photoUrl:
            //         'https://storage.googleapis.com/firstry-7e136.appspot.com/development/pdp/Anthony_CHIRON_2024-01-20T22%3A17%3A42.605Z.webp?GoogleAccessId=firebase-adminsdk-v4ylh%40firstry-7e136.iam.gserviceaccount.com&Expires=16447014000&Signature=ejy6y%2BiUBXsHF5OBAfEGX0JBZxFD3OHFOWHbTUxUQTZgp2AvlsvDfusrK253QGWKZtgQDVaiWxLIlJTIm4jsjd2hmDi5LuvsvpaL%2FhailEgMXWTxn79wtdwG%2FRhmNPwVutsdGs2WUGg8qWltGZHtG4l1V4Xkoq5egoy2XE4ip4T9iJZGkrOZflXkv9RNPag7vkvI2mm5RjalAjzBd0HsfRq%2FcijXS%2Fsd7ia5Jm9y6NEl2EAp7gwSRSon3iG31u%2B2AfySIQ0Tf9QUsfjz33UWgxXuQG11JXwEyPrhVhGhXUWUy%2BERb18T%2FOezptHiVDDr9E4%2Bsnnc%2B06OkdUvGokWZQ%3D%3D',
            //       __v: 0,
            //       socials: {
            //         instagram: 'anthony.chiron',
            //         twitter: '',
            //         youtube: '',
            //       },
            //     },
            //     category: {
            //       _id: '65aadee407bd9a63d9fe9d61',
            //       name: 'U18',
            //       description: 'Catégorie U18',
            //       sports: ['Roller'],
            //       maxRiders: 25,
            //       registerPrice: 20,
            //       isQualificationStep: true,
            //       contestId: '65a8f95fbc48c4bfe745890b',
            //       __v: 0,
            //     },
            //     state: 'pending_approval',
            //     contest: {
            //       _id: '65a8f95fbc48c4bfe745890b',
            //       name: 'FISE Xperience',
            //       startDate: '2024-03-15T00:00:00.000Z',
            //       endDate: '2024-03-17T00:00:00.000Z',
            //       sports: ['roller', 'trottinette', 'skate'],
            //       location: {
            //         country: 'États-Unis',
            //         postalCode: '53203',
            //         city: 'Milwaukee',
            //         address:
            //           '1111 Vel R. Phillips Ave, Milwaukee, WI 53203, États-Unis',
            //       },
            //     },
            //   },
            //   {
            //     _id: '65aae4929939b79709b78e45',
            //     rider: {
            //       _id: '65a7fc5acb14f5edca134481',
            //       firstName: 'Anthony',
            //       lastName: 'CHIRON',
            //       nationality: {
            //         flags: {
            //           png: 'https://flagcdn.com/w320/fr.png',
            //           svg: 'https://flagcdn.com/fr.svg',
            //           alt: 'The flag of France is composed of three equal vertical bands of blue, white and red.',
            //         },
            //         name: {
            //           common: 'France',
            //           official: 'French Republic',
            //           nativeName: {
            //             fra: {
            //               official: 'République française',
            //               common: 'France',
            //             },
            //           },
            //         },
            //       },
            //       birthDate: '1997-06-06T00:00:00.000Z',
            //       city: 'Bordeaux',
            //       sports: ['roller'],
            //       photoUrl:
            //         'https://storage.googleapis.com/firstry-7e136.appspot.com/development/pdp/Anthony_CHIRON_2024-01-20T22%3A17%3A42.605Z.webp?GoogleAccessId=firebase-adminsdk-v4ylh%40firstry-7e136.iam.gserviceaccount.com&Expires=16447014000&Signature=ejy6y%2BiUBXsHF5OBAfEGX0JBZxFD3OHFOWHbTUxUQTZgp2AvlsvDfusrK253QGWKZtgQDVaiWxLIlJTIm4jsjd2hmDi5LuvsvpaL%2FhailEgMXWTxn79wtdwG%2FRhmNPwVutsdGs2WUGg8qWltGZHtG4l1V4Xkoq5egoy2XE4ip4T9iJZGkrOZflXkv9RNPag7vkvI2mm5RjalAjzBd0HsfRq%2FcijXS%2Fsd7ia5Jm9y6NEl2EAp7gwSRSon3iG31u%2B2AfySIQ0Tf9QUsfjz33UWgxXuQG11JXwEyPrhVhGhXUWUy%2BERb18T%2FOezptHiVDDr9E4%2Bsnnc%2B06OkdUvGokWZQ%3D%3D',
            //       __v: 0,
            //       socials: {
            //         instagram: 'anthony.chiron',
            //         twitter: '',
            //         youtube: '',
            //       },
            //     },
            //     category: {
            //       _id: '65aadee407bd9a63d9fe9d61',
            //       name: 'U18',
            //       description: 'Catégorie U18',
            //       sports: ['Roller'],
            //       maxRiders: 25,
            //       registerPrice: 20,
            //       isQualificationStep: true,
            //       contestId: '65a8f95fbc48c4bfe745890b',
            //       __v: 0,
            //     },
            //     state: 'pending_approval',
            //     contest: {
            //       _id: '65a8f95fbc48c4bfe745890b',
            //       name: 'FISE Xperience',
            //       startDate: '2024-03-15T00:00:00.000Z',
            //       endDate: '2024-03-17T00:00:00.000Z',
            //       sports: ['roller', 'trottinette', 'skate'],
            //       location: {
            //         country: 'États-Unis',
            //         postalCode: '53203',
            //         city: 'Milwaukee',
            //         address:
            //           '1111 Vel R. Phillips Ave, Milwaukee, WI 53203, États-Unis',
            //       },
            //     },
            //   },
            //   {
            //     _id: '65aae4929939b79709b78e45',
            //     rider: {
            //       _id: '65a7fc5acb14f5edca134481',
            //       firstName: 'OH MY COD',
            //       lastName: 'Un test',
            //       nationality: {
            //         flags: {
            //           png: 'https://flagcdn.com/w320/fr.png',
            //           svg: 'https://flagcdn.com/fr.svg',
            //           alt: 'The flag of France is composed of three equal vertical bands of blue, white and red.',
            //         },
            //         name: {
            //           common: 'France',
            //           official: 'French Republic',
            //           nativeName: {
            //             fra: {
            //               official: 'République française',
            //               common: 'France',
            //             },
            //           },
            //         },
            //       },
            //       birthDate: '1997-06-06T00:00:00.000Z',
            //       city: 'Bordeaux',
            //       sports: ['roller'],
            //       photoUrl:
            //         'https://storage.googleapis.com/firstry-7e136.appspot.com/development/pdp/Anthony_CHIRON_2024-01-20T22%3A17%3A42.605Z.webp?GoogleAccessId=firebase-adminsdk-v4ylh%40firstry-7e136.iam.gserviceaccount.com&Expires=16447014000&Signature=ejy6y%2BiUBXsHF5OBAfEGX0JBZxFD3OHFOWHbTUxUQTZgp2AvlsvDfusrK253QGWKZtgQDVaiWxLIlJTIm4jsjd2hmDi5LuvsvpaL%2FhailEgMXWTxn79wtdwG%2FRhmNPwVutsdGs2WUGg8qWltGZHtG4l1V4Xkoq5egoy2XE4ip4T9iJZGkrOZflXkv9RNPag7vkvI2mm5RjalAjzBd0HsfRq%2FcijXS%2Fsd7ia5Jm9y6NEl2EAp7gwSRSon3iG31u%2B2AfySIQ0Tf9QUsfjz33UWgxXuQG11JXwEyPrhVhGhXUWUy%2BERb18T%2FOezptHiVDDr9E4%2Bsnnc%2B06OkdUvGokWZQ%3D%3D',
            //       __v: 0,
            //       socials: {
            //         instagram: 'anthony.chiron',
            //         twitter: '',
            //         youtube: '',
            //       },
            //     },
            //     category: {
            //       _id: '65aadee407bd9a63d9fe9d61',
            //       name: 'U18',
            //       description: 'Catégorie U18',
            //       sports: ['Roller'],
            //       maxRiders: 25,
            //       registerPrice: 20,
            //       isQualificationStep: true,
            //       contestId: '65a8f95fbc48c4bfe745890b',
            //       __v: 0,
            //     },
            //     state: 'pending_approval',
            //     contest: {
            //       _id: '65a8f95fbc48c4bfe745890b',
            //       name: 'FISE Xperience',
            //       startDate: '2024-03-15T00:00:00.000Z',
            //       endDate: '2024-03-17T00:00:00.000Z',
            //       sports: ['roller', 'trottinette', 'skate'],
            //       location: {
            //         country: 'États-Unis',
            //         postalCode: '53203',
            //         city: 'Milwaukee',
            //         address:
            //           '1111 Vel R. Phillips Ave, Milwaukee, WI 53203, États-Unis',
            //       },
            //     },
            //   },
            //   {
            //     _id: '65aae4929939b79709b78e45',
            //     rider: {
            //       _id: '65a7fc5acb14f5edca134481',
            //       firstName: 'Test',
            //       lastName: '1',
            //       nationality: {
            //         flags: {
            //           png: 'https://flagcdn.com/w320/fr.png',
            //           svg: 'https://flagcdn.com/fr.svg',
            //           alt: 'The flag of France is composed of three equal vertical bands of blue, white and red.',
            //         },
            //         name: {
            //           common: 'France',
            //           official: 'French Republic',
            //           nativeName: {
            //             fra: {
            //               official: 'République française',
            //               common: 'France',
            //             },
            //           },
            //         },
            //       },
            //       birthDate: '1997-06-06T00:00:00.000Z',
            //       city: 'Bordeaux',
            //       sports: ['roller'],
            //       photoUrl:
            //         'https://storage.googleapis.com/firstry-7e136.appspot.com/development/pdp/Anthony_CHIRON_2024-01-20T22%3A17%3A42.605Z.webp?GoogleAccessId=firebase-adminsdk-v4ylh%40firstry-7e136.iam.gserviceaccount.com&Expires=16447014000&Signature=ejy6y%2BiUBXsHF5OBAfEGX0JBZxFD3OHFOWHbTUxUQTZgp2AvlsvDfusrK253QGWKZtgQDVaiWxLIlJTIm4jsjd2hmDi5LuvsvpaL%2FhailEgMXWTxn79wtdwG%2FRhmNPwVutsdGs2WUGg8qWltGZHtG4l1V4Xkoq5egoy2XE4ip4T9iJZGkrOZflXkv9RNPag7vkvI2mm5RjalAjzBd0HsfRq%2FcijXS%2Fsd7ia5Jm9y6NEl2EAp7gwSRSon3iG31u%2B2AfySIQ0Tf9QUsfjz33UWgxXuQG11JXwEyPrhVhGhXUWUy%2BERb18T%2FOezptHiVDDr9E4%2Bsnnc%2B06OkdUvGokWZQ%3D%3D',
            //       __v: 0,
            //       socials: {
            //         instagram: 'anthony.chiron',
            //         twitter: '',
            //         youtube: '',
            //       },
            //     },
            //     category: {
            //       _id: '65aadee407bd9a63d9fe9d61',
            //       name: 'U18',
            //       description: 'Catégorie U18',
            //       sports: ['Roller'],
            //       maxRiders: 25,
            //       registerPrice: 20,
            //       isQualificationStep: true,
            //       contestId: '65a8f95fbc48c4bfe745890b',
            //       __v: 0,
            //     },
            //     state: 'pending_approval',
            //     contest: {
            //       _id: '65a8f95fbc48c4bfe745890b',
            //       name: 'FISE Xperience',
            //       startDate: '2024-03-15T00:00:00.000Z',
            //       endDate: '2024-03-17T00:00:00.000Z',
            //       sports: ['roller', 'trottinette', 'skate'],
            //       location: {
            //         country: 'États-Unis',
            //         postalCode: '53203',
            //         city: 'Milwaukee',
            //         address:
            //           '1111 Vel R. Phillips Ave, Milwaukee, WI 53203, États-Unis',
            //       },
            //     },
            //   },
            // ];
            console.log(result);
            this.registrations = result;
            this.registrations.push(...this.registrations);
            this.registrations.push(...this.registrations);
            // this.registrations.push(...this.registrations);
            // this.registrations.push(...this.registrations);
            this.pendingApprovalRegistrations = this.registrations.filter(
              (registration) => registration.state === 'pending_approval'
            );
            this.getRegistrations();
          });
      });
    });
  }

  onSelectedCategory(category: any) {
    this.selectedCategory = category;
    this.getRegistrations();
  }

  getRegistrations() {
    this.selectedRegistrations = this.registrations.filter(
      (registration) => registration.category._id === this.selectedCategory._id
    );
  }
}
