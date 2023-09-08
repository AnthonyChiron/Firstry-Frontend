import { AuthService } from '../../services/Auth/AuthService/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { rolesEnum } from 'src/app/constants/rolesEnum';

@Component({
  selector: 'sidebar-primary',
  templateUrl: './sidebar-primary.component.html',
  styleUrls: ['./sidebar-primary.component.scss'],
})
export class SidebarPrimaryComponent implements OnInit {
  @Input() Routes: { icon: String; path: String }[] = [];
  rolesEnum = rolesEnum;

  constructor(protected authService: AuthService) {}

  ngOnInit(): void {}

  display(log: String) {
    console.log(log);
  }
}
