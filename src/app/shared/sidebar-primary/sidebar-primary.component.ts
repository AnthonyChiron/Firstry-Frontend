import { Routes } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sidebar-primary',
  templateUrl: './sidebar-primary.component.html',
  styleUrls: ['./sidebar-primary.component.scss'],
})
export class SidebarPrimaryComponent implements OnInit {
  @Input() Routes: { icon: String; path: String }[] = [];

  ngOnInit(): void {}

  display(log: String) {
    console.log(log);
  }
}
