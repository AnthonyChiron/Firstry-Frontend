import { Component, Input, OnInit } from '@angular/core';
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
export class PlanningComponent implements OnInit {
  @Input() categories: any[] = [];
  @Input() edit: boolean = false;
  eventsCat: CalendarEvent[] = [];
  dayStartHour = 8;
  dayEndHour = 18;
  refresh = new Subject<void>();

  days = [];
  selectedDay: number = 0;

  ngOnInit(): void {
    console.log(this.categories);
    // Map les catégories pour les afficher dans le planning
    this.eventsCat = this.categories.map((category) => {
      return {
        ...category,
        title: category.name,
        start: new Date(category.startDate),
        end: new Date(category.endDate),
        meta: {
          sport: category.sport,
          nbInscrit: 12,
          nbMax: category.maxCompetitorsCount,
        },
      };
    });

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

    // A partir des categories, trouver les différentes jours et les mettre dans un tableau. Si un jour existe déjà, ne pas le rajouter
    this.categories.forEach((category) => {
      const date = new Date(category.startDate);
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();
      const dateStr = `${day}-${month}-${year}`;
      if (!this.days.includes(dateStr)) {
        this.days.push(date);
      }
    });
    console.log(this.days);
  }

  prevDate() {
    this.selectedDay--;
    console.log(this.days[this.selectedDay]);
  }

  nextDate() {
    this.selectedDay++;
  }

  viewDate: Date = new Date('November 27, 2023 11:00:00');
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
  ];

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
