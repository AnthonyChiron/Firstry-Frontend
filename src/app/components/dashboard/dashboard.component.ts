import { ScreenSizeService } from './../../shared/services/screenSize/screen-size.service';
import { ContestsService } from 'src/app/shared/data/ContestsService/contests.service';
import { Component, OnChanges, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { slider } from 'src/app/shared/transitions/slider';
import { fadeAnimation } from 'src/app/shared/transitions/fade';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private contestsService: ContestsService,
    private ssc: ScreenSizeService,
    private router: Router
  ) {}

  contests = [];
  ddOptions = [];
  contestsDdOptions: any[] = [];
  closePopup: boolean = true;
  isMobile: boolean;
  selectedContestId: string;

  ngOnInit(): void {
    this.contestsService.getOrganizerContests().subscribe((data) => {
      if (data) {
        this.contests = data;
        this.selectedContestId = this.contests[0]._id;

        // Mise en place du dropdown
        this.contestsDdOptions = this.contests.map((contest) => {
          return { label: contest.name, value: contest._id };
        });
        this.ddOptions = this.contests.map((contest) => ({
          label: contest.name,
          value: contest._id,
        }));

        // Vérifier si la route possède un contestId
        // Si c'est le cas, vérifier que ce contestId appartient bien à l'organisateur
        // Sinon, rediriger vers le premier contest
        const url = this.router.url.split('/');
        if (url.length > 2) {
          const contestId = url[2];
          const contest = this.contests.find(
            (contest) => contest._id === contestId
          );
          if (!contest) {
            this.router.navigate([
              '/dashboard',
              this.contests[0]._id,
              'overview',
            ]);
          }
        } else {
          this.router.navigate([
            '/dashboard',
            this.contests[0]._id,
            'overview',
          ]);
        }

        // // Redirection vers le premier contest
        // this.router.navigate(['/dashboard', this.contests[0]._id, 'overview']);
      }
    });

    this.isMobile = this.ssc.isMobile;
    this.ssc.sizeChanged.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }

  selectedContest(event) {
    this.selectedContestId = event.value;
    this.router.navigate(['/dashboard', event.value, 'overview']);
  }
}
