import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthorizationService } from '../../services/authorization.service';
import { RequestService } from '../../services/request.service';

import { UserResponseModel } from '../../models/user-response.model'

@Component({
  selector: 'account-page',
  templateUrl: './account-page.component.html',
})
export class AccountPageComponent implements OnInit {

  title: string = "Страница пользователя";
  idLabel: string = "ID пользователя:";
  usernameLabel: string = "Имя пользователя:";
  logoutStr: string = "Выйти";

  
  subscription: Subscription;

  userModel: UserResponseModel = { id: "", username: "" };

  get myUsername(): string | undefined {
    return this.authorizationService.username;
  }

  get isMyPage(): boolean {
    return this.userModel.username === this.myUsername;
  }

  constructor(
    public activateRoute: ActivatedRoute,
    public authorizationService: AuthorizationService,
    public requestService: RequestService,
  ) {
    this.subscription = activateRoute.params.subscribe(params => this.userModel.username = params['username'])!;

    this.requestService
      .get(`/api/user/getUser/${this.userModel.username}`)
      .then(respObj => this.userModel = respObj);

    this.authorizationService.loginByLocalStorageData();
  }

  ngOnInit(): void {

  }

  logout(): void {
    this.authorizationService.logout();
  }
}