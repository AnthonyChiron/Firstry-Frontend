import { ScreenSizeService } from 'src/app/shared/services/screenSize/screen-size.service';
import { StepsService } from './../../../data/StepsService/steps-service.service';
import { Component, Input, OnInit, OnChanges, OnDestroy } from '@angular/core';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
} from 'angular-calendar';
import { Subject } from 'rxjs';
import { ContestModel } from 'src/app/models/contest.model';
import { StepModelDTO, stepModelToDTO } from 'src/app/models/step.model';

@Component({
  selector: 'planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss'],
})
export class PlanningComponent implements OnInit, OnChanges, OnDestroy {
  @Input() categories: any[] = [];
  @Input() contest: ContestModel;
  @Input() edit: boolean = false;
  @Input() height: string = '100';

  eventsCat: CalendarEvent[] = [];

  dayStartHour = 7;
  dayEndHour = 21;
  refresh = new Subject<void>();

  days = [];
  viewDate: Date;
  selectedDay: number = 0;
  isMobile: boolean = false;

  constructor(
    private _stepsService: StepsService,
    private _screenSizeService: ScreenSizeService
  ) {}

  ngOnInit(): void {
    this.parseCategoriesIntoEvents();
    this.initDates();
    this._screenSizeService.sizeChanged.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }

  ngOnChanges() {
    this.parseCategoriesIntoEvents();
  }

  ngOnDestroy() {
    this._screenSizeService.sizeChanged.unsubscribe();
  }

  parseCategoriesIntoEvents() {
    this.eventsCat = this.categories.flatMap((category) =>
      category.steps
        .filter((step) => step.startDate)
        .map((step) => ({
          title: step.name + ' ' + category.name,
          start: new Date(step.startDate),
          end: new Date(step.endDate),
          meta: {
            sport: category.sports.join(', '),
            nbInscrit: 12,
            nbMax: category.maxCompetitorsCount,
            step: step,
          },
        }))
    );
    if (this.edit) {
      this.eventsCat = this.eventsCat.map((event) => {
        return {
          ...event,
          resizable: {
            beforeStart: true, // this allows you to configure the sides the event is resizable from
            afterEnd: true,
          },
          draggable: true, // permet de déplacer l'événement
        };
      });
    }
  }

  prevDate() {
    this.selectedDay--;
    this.viewDate = this.days[this.selectedDay];
  }

  nextDate() {
    this.selectedDay++;
    this.viewDate = this.days[this.selectedDay];
  }

  events: CalendarEvent[] = [];

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;

    event.meta.step.startDate = newStart;
    event.meta.step.endDate = newEnd;

    this._stepsService
      .update(event.meta.step._id, stepModelToDTO(event.meta.step))
      .subscribe((res) => {
        console.log(res);
      });
    this.refresh.next();
  }

  hourSegmentFormatter(date: Date, locale: string): string {
    return new Intl.DateTimeFormat(locale, {
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  }

  initDates() {
    let dates = [];
    let currentDate = new Date(this.contest.startDate);
    this.viewDate = this.contest.startDate;

    while (currentDate <= this.contest.endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    this.days = dates;
  }
}
