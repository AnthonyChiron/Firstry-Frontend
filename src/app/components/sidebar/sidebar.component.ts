import { Component, Input, OnInit } from '@angular/core';
import { rolesEnum } from 'src/app/constants/rolesEnum';
import { AuthService } from 'src/app/services/auth/AuthService/auth.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() Routes: { icon: String; path: String }[] = [];
  rolesEnum = rolesEnum;
  showModal = true;

  constructor(protected authService: AuthService) {}

  closeModal() {
    this.showModal = false;
  }

  ngOnInit(): void {}

  display(log: String) {
    console.log(log);
  }
}
