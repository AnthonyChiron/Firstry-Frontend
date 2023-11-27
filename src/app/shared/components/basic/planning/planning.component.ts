import { Component } from '@angular/core';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
} from 'angular-calendar';
import { Subject } from 'rxjs';

@Component({
  selector: 'planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss'],
})
export class PlanningComponent {
  viewDate: Date = new Date();
  events: CalendarEvent[] = [
    {
      start: new Date('November 27, 2023 11:00:00'), // définir la date et l'heure de début
      end: new Date('November 27, 2023 12:00:00'), // définir la date et l'heure de début
      title: 'U14', // le titre de l'événement
      resizable: {
        beforeStart: true, // this allows you to configure the sides the event is resizable from
        afterEnd: true,
      },
      draggable: true, // permet de déplacer l'événement
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
    },
  ];
  dayStartHour = 8;
  dayEndHour = 18;

  refresh = new Subject<void>();

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
}
