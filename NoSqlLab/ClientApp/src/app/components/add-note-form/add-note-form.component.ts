import { Component, OnInit } from '@angular/core';

import { NoteApiModel } from '../../models/note-api.model';

import { DictionaryService } from '../../services/dictionary.service';
import { AuthorizationService } from '../../services/authorization.service';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'add-note-form',
  templateUrl: './add-note-form.component.html',
  providers: [ DictionaryService ],
})
export class AddNoteFormComponent implements OnInit {

  formData: NoteApiModel = {
    title: "",
    text: "",
  };

  formTitle: string = "Добавление заметки";

  titleStr: string = "Заголовок заметки";
  textStr: string = "Текст заметки";

  formSubmitButton: string = "Добавить";

  emptyTitleStr: string = "Отсутствует заколовок";
  emptyTextStr: string = "Отсутствует текст";

  serverError: Error | null = null;
  get firstSpanError(): string {

    return this.serverError ?
        this.dictionaryService.get(this.serverError.message)
      : this.emptyTitleStr;
  }

  constructor(
    public dictionaryService: DictionaryService,
    public authorizationService: AuthorizationService,
    public requestService: RequestService,
  ) { }

  ngOnInit(): void {

  }

  submitForm(): void {
    this.requestService
      .post('/api/note/add/', this.formData, this.authorizationService.jwtString);
  }

  resetServerError(): void {
    this.serverError = null;
  }

}
