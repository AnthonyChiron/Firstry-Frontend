import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab',
  template: `
    <div class="tab" [hidden]="!active">
      <ng-content></ng-content>
    </div>
  `,
})
export class TabComponent implements OnInit {
  @Input() title: string = '';
  public active: boolean = false;

  ngOnInit() {
    this.active = false;
  }
}
