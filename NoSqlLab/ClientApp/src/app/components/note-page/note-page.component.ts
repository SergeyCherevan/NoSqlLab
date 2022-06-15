import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthorizationService } from '../../services/authorization.service';
import { RequestService } from '../../services/request.service';

import { NoteResponseModel } from '../../models/note-response.model'

@Component({
  selector: 'note-page',
  templateUrl: './note-page.component.html',
})
export class NotePageComponent implements OnInit {

  title: string = "Страница заметки";
  idLabel: string = "ID заметки: ";
  authorLabel: string = "Автор заметки: ";
  deleteStr: string = "Удалить заметку";


  noteModel: NoteResponseModel = {
    id: "",
    title: "",
    text: "",
    userName: "",
    lastUpdate: new Date(),
  };

  subscription: Subscription;

  get myUsername(): string | undefined {
    return this.authorizationService.username;
  }

  get isMyPage(): boolean {
    return this.noteModel.userName === this.myUsername;
  }

  constructor(
    public activateRoute: ActivatedRoute,
    public router: Router,
    public authorizationService: AuthorizationService,
    public requestService: RequestService,
  ) {
    this.subscription = activateRoute.params.subscribe(params => this.noteModel.id = params['id'])!;

    this.authorizationService.loginByLocalStorageData();
  }

  ngOnInit(): void {
    this.downloadNote()
  }

  downloadNote(): void {

    this.requestService
      .get(`/api/note/get/${this.noteModel.id}`)
      .then(respObj => this.noteModel = respObj);
  }

  deleteNote(): void {

    this.requestService
      .delete(
        `/api/note/delete/${this.noteModel.id}`,
        undefined,
        this.authorizationService.jwtString)
      .catch(() => { })
      .then(() => this.router.navigateByUrl(`/accountPage/${this.noteModel.userName}`));
  }
}
