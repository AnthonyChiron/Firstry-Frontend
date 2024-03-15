import { Component } from '@angular/core';
import { LiveService } from 'src/app/shared/services/LiveService/live.service';

@Component({
  selector: 'live-timer',
  templateUrl: './live-timer.component.html',
  styleUrls: ['./live-timer.component.scss'],
})
export class LiveTimerComponent {
  currentTimer: any;

  timerOptions: any[] = [
    { label: '00:40', value: '40' },
    { label: '00:45', value: '45' },
    { label: '00:50', value: '50' },
    { label: '00:55', value: '55' },
    { label: '01:00', value: '60' },
    { label: '01:05', value: '65' },
    { label: '01:10', value: '70' },
    { label: '01:20', value: '80' },
    { label: '01:30', value: '90' },
    { label: '01:40', value: '100' },
    { label: '01:50', value: '110' },
    { label: '02:00', value: '120' },
    { label: '02:10', value: '130' },
    { label: '02:20', value: '140' },
    { label: '02:30', value: '150' },
    { label: '02:40', value: '160' },
    { label: '02:50', value: '170' },
    { label: '03:00', value: '180' },
  ];

  constructor(private _liveService: LiveService) {}

  selectTimer(timer) {
    this.currentTimer = timer;
    this._liveService.updateCurrentTimer(this.currentTimer);
    this._liveService.stopTimer();
  }

  start() {
    this._liveService.startTimer();
  }

  stop() {
    this._liveService.stopTimer();
  }

  reset() {
    this._liveService.resetTimer();
  }
}
