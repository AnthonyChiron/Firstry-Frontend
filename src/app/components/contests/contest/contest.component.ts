import { ScreenSizeService } from 'src/app/shared/services/screenSize/screen-size.service';
import { ContestsService } from './../../../shared/data/ContestsService/contests.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ContestModel, parseContestModel } from 'src/app/models/contest.model';
import { filter } from 'rxjs';

@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.scss'],
})
export class ContestComponent implements OnInit {
  contest: ContestModel;
  isMobile: boolean = false;
  links: { label: string; route: string; icon: string }[] = [];
  isOverview: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cs: ContestsService,
    private _screenSize: ScreenSizeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.cs.getById(params.id).subscribe((contest) => {
        this.contest = parseContestModel(contest);
        this.getMobileNavbarLinks();
      });
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const urlSegments = event.urlAfterRedirects.split('/');
        const overviewIndex = urlSegments.findIndex(
          (segment) => segment === 'overview'
        );

        if (overviewIndex !== -1 && overviewIndex === urlSegments.length - 1)
          this.isOverview = true;
        else this.isOverview = false;
      });

    this._screenSize.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
      this.getMobileNavbarLinks();
    });
  }

  getMobileNavbarLinks() {
    if (this.isMobile) {
      if (
        this.contest &&
        new Date(this.contest.registrationEndDate) > new Date()
      ) {
        this.links = [
          { label: 'Aperçu', route: 'overview', icon: 'fa-solid fa-home' },
          {
            label: 'Planning',
            route: 'planning',
            icon: 'fa-solid fa-calendar',
          },
          { label: 'Inscription', route: 'register', icon: 'fa-solid fa-plus' },
        ];
      } else {
        this.links = [
          { label: 'Aperçu', route: 'overview', icon: 'fa-solid fa-home' },
          {
            label: 'Planning',
            route: 'planning',
            icon: 'fa-solid fa-calendar',
          },
          { label: 'Résultats', route: 'results', icon: 'fa-solid fa-list-ol' },
        ];
      }
    } else {
      if (
        this.contest &&
        new Date(this.contest.registrationEndDate) > new Date()
      ) {
        this.links = [
          { label: 'Aperçu', route: 'overview', icon: 'fa-solid fa-home' },
          { label: 'Inscription', route: 'register', icon: 'fa-solid fa-plus' },
          { label: 'Résultats', route: 'results', icon: 'fa-solid fa-list-ol' },
        ];
      } else {
        this.links = [
          { label: 'Aperçu', route: 'overview', icon: 'fa-solid fa-home' },
          { label: 'Résultats', route: 'results', icon: 'fa-solid fa-list-ol' },
        ];
      }
    }
  }
}
