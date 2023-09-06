import { Routes } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sidebar-icon',
  templateUrl: './sidebar-icon.component.html',
  styleUrls: ['./sidebar-icon.component.scss'],
})
export class SidebarIconComponent implements OnInit {
  @Input() Routes: { icon: String; path: String }[] = [];

  ngOnInit(): void {}

  display(log: String) {
    console.log(log);
  }
}
