import {
  Component,
  AfterContentInit,
  ContentChildren,
  QueryList,
} from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabs',
  template: `
    <div class="tabs">
      <ul>
        <li
          *ngFor="let tab of tabs"
          (click)="selectTab(tab)"
          [class.active]="tab.active"
        >
          {{ tab.title }}
        </li>
      </ul>
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;

  ngAfterContentInit() {
    let activeTabs = this.tabs.filter((tab) => tab.active);
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab: TabComponent) {
    this.tabs.toArray().forEach((t) => (t.active = false));
    tab.active = true;
  }
}
