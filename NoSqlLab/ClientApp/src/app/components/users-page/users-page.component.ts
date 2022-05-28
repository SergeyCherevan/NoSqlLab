import { Component, OnInit } from '@angular/core';

import { UserResponseModel } from '../../models/user-response.model';

import { DictionaryService } from '../../services/dictionary.service';
import { RequestService } from '../../services/request.service';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'users-page',
  templateUrl: './users-page.component.html',
  providers: [ DictionaryService ],
})
export class UsersPageComponent implements OnInit {

  title: string = "Пользователи:";

  usersData: UserResponseModel[] = [];

  constructor(
    public dictionaryService: DictionaryService,
    public requestService: RequestService,
    public authorizationService: AuthorizationService) { }

  ngOnInit(): void {
    this.requestService
      .get('/api/user/getAll', this.authorizationService.jwtString)
      .then((respObj: UserResponseModel[]) => this.usersData = respObj);
  }

}
