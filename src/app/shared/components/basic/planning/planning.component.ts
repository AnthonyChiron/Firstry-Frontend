import { Component, Input, OnInit, OnChanges } from '@angular/core';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
} from 'angular-calendar';
import { vi } from 'date-fns/locale';
import { Subject } from 'rxjs';
import { ContestModel } from 'src/app/models/contest.model';

@Component({
  selector: 'planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss'],
})
export class PlanningComponent implements OnInit {
  @Input() categories: any[] = [];
  @Input() contest: ContestModel;
  @Input() edit: boolean = false;

  eventsCat: CalendarEvent[] = [
    {
      start: new Date('November 27, 2023 11:00:00'), // définir la date et l'heure de début
      end: new Date('November 27, 2023 12:00:00'), // définir la date et l'heure de début
      title: 'U14', // le titre de l'événement
      resizable: {
        beforeStart: true, // this allows you to configure the sides the event is resizable from
        afterEnd: true,
      },
      draggable: true, // permet de déplacer l'événement
      meta: {
        sport: 'Roller',
        nbInscrit: 12,
        nbMax: 15,
      },
    },
    {
      start: new Date('November 27, 2023 14:00:00'), // définir la date et l'heure de début
      end: new Date('November 27, 2023 16:00:00'), // définir la date et l'heure de début
      title: 'Amateurs', // le titre de l'événement
      resizable: {
        beforeStart: true, // this allows you to configure the sides the event is resizable from
        afterEnd: true,
      },
      draggable: true, // permet de déplacer l'événement
      meta: {
        sport: 'Trottinette',
        nbInscrit: 25,
        nbMax: 45,
      },
    },
    {
      start: new Date('November 27, 2023 14:00:00'), // définir la date et l'heure de début
      end: new Date('November 27, 2023 16:00:00'), // définir la date et l'heure de début
      title: 'Pro hommes', // le titre de l'événement
      resizable: {
        beforeStart: true, // this allows you to configure the sides the event is resizable from
        afterEnd: true,
      },
      draggable: true, // permet de déplacer l'événement
      meta: {
        sport: 'Roller',
        nbInscrit: 25,
        nbMax: 45,
      },
    },
    {
      start: new Date('November 27, 2023 14:00:00'), // définir la date et l'heure de début
      end: new Date('November 27, 2023 16:00:00'), // définir la date et l'heure de début
      title: 'Pro femmes', // le titre de l'événement
      resizable: {
        beforeStart: true, // this allows you to configure the sides the event is resizable from
        afterEnd: true,
      },
      draggable: true, // permet de déplacer l'événement
      meta: {
        sport: 'Roller',
        nbInscrit: 25,
        nbMax: 45,
      },
    },
  ];

  dayStartHour = 8;
  dayEndHour = 18;
  refresh = new Subject<void>();

  days = [];
  viewDate: Date = new Date('November 27, 2023 14:00:00');
  selectedDay: number = 0;

  ngOnInit(): void {
    // this.eventsCat = this.categories.flatMap((category) =>
    //   category.steps
    //     .filter((step) => step.startDate)
    //     .map((step) => ({
    //       ...category,
    //       title: step.name + ' ' + category.name,
    //       start: new Date(step.startDate),
    //       end: new Date(step.endDate),
    //       meta: {
    //         sport: category.sport.join(', '),
    //         nbInscrit: 12,
    //         nbMax: category.maxCompetitorsCount,
    //       },
    //     }))
    // );
    // if (this.edit) {
    //   this.eventsCat = this.eventsCat.map((event) => {
    //     return {
    //       ...event,
    //       resizable: {
    //         beforeStart: true, // this allows you to configure the sides the event is resizable from
    //         afterEnd: true,
    //       },
    //       draggable: true, // permet de déplacer l'événement
    //     };
    //   });
    // }
    // this.initDates();
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
