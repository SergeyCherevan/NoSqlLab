import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthorizationService } from '../../services/authorization.service';
import { RequestService } from '../../services/request.service';

import { UserResponseModel } from '../../models/user-response.model'
import { NoteModel } from '../../models/note.model'

@Component({
  selector: 'note-page',
  templateUrl: './note-page.component.html',
})
export class NotePageComponent implements OnInit, OnDestroy {

  title: string = "Страница заметки";
  idLabel: string = "ID заметки: ";
  authorLabel: string = "Автор заметки: ";
  deleteStr: string = "Удалить заметку";


  noteModel: NoteModel = {
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
    public authorizationService: AuthorizationService,
    public requestService: RequestService,
  ) {
    this.subscription = activateRoute.params.subscribe(params => this.noteModel.id = params['id'])!;

    this.authorizationService.loginByLocalStorageData();
  }

  downloadNotesInterval: number = 0;

  ngOnInit(): void {
    this.downloadNotesInterval = window.setInterval(() => this.downloadNote(), 1000);
  }

  ngOnDestroy(): void {
    window.clearInterval(this.downloadNotesInterval);
  }

  downloadNote(): void {

    console.log(this.noteModel.id);

    this.requestService
      .get(`/api/note/get/${this.noteModel.id}`)
      .then(respObj => this.noteModel = respObj);
  }

  deleteNote(): void {
    
  }
}
