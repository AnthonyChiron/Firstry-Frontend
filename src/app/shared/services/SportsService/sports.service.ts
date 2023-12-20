import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SportsService {
  formatSportsOptionFormContest(contest) {
    // Retourne un tableau d'option de sport en fonction du contest
    return contest.sports.map((sport) => {
      return { name: sport, value: sport[0].toUpperCase() + sport.slice(1) };
    });
  }

  getSportsAsOption() {
    return [
      { label: 'Roller', value: 'roller' },
      { label: 'Trottinette', value: 'trottinette' },
      { label: 'Skate', value: 'skate' },
      { label: 'BMX', value: 'bmx' },
      { label: 'Quad', value: 'quad' },
    ];
  }
}
