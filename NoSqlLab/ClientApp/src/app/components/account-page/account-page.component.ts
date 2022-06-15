import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthorizationService } from '../../services/authorization.service';
import { RequestService } from '../../services/request.service';

import { UserResponseModel } from '../../models/user-response.model'
import { NoteResponseModel } from '../../models/note-response.model'

@Component({
  selector: 'account-page',
  templateUrl: './account-page.component.html',
})
export class AccountPageComponent implements OnInit {

  title: string = "Страница пользователя";
  idLabel: string = "ID пользователя:";
  usernameLabel: string = "Имя пользователя:";
  logoutStr: string = "Выйти";
  changePasswordStr: string = "Изменить пароль";

  
  subscription: Subscription;

  userModel: UserResponseModel = { id: "", username: "" };
  noteItems: NoteResponseModel[] = [];

  get myUsername(): string | undefined {
    return this.authorizationService.username;
  }

  get isMyPage(): boolean {
    return this.userModel.username === this.myUsername;
  }

  constructor(
    public activateRoute: ActivatedRoute,
    public router: Router,
    public authorizationService: AuthorizationService,
    public requestService: RequestService,
  ) {
    this.subscription = activateRoute.params.subscribe(params => {
      this.userModel.username = params['username'];

      this.requestService
        .get(`/api/user/getUser/${this.userModel.username}`)
        .then(respObj => this.userModel = respObj)
        .then(() => this.downloadNotes());

      this.authorizationService.loginByLocalStorageData()
    })!;
  }

  ngOnInit(): void { }

  downloadNotes(): void {
    this.requestService
      .get(`/api/note/getByUserId/${this.userModel.id}`)
      .then(respObj => this.noteItems = respObj);
  }

  logout(): void {
    this.authorizationService.logout();
  }

  goNotePage(id: string): void {
    this.router.navigateByUrl(`/notePage/${id}`);
  }
}
