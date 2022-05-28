import { Component, OnInit, Input } from '@angular/core';

import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() title: string = "";

  usersPageStr: string = "Пользователи";
  loginStr: string = "Вход";

  get userNameStr(): string | undefined {
    return this.authorizationService.username;
  }

  constructor(public authorizationService: AuthorizationService) { }

  ngOnInit(): void { }
}
