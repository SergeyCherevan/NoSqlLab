import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { EditNoteModel } from '../../models/edit-note.model';

import { DictionaryService } from '../../services/dictionary.service';
import { AuthorizationService } from '../../services/authorization.service';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'edit-note-form',
  templateUrl: './edit-note-form.component.html',
  providers: [ DictionaryService ],
})
export class EditNoteFormComponent implements OnInit {

  @Input() @Output()
  formData: EditNoteModel = {
    id: "",
    title: "",
    text: "",
  };

  formTitle: string = "Редактирование заметки";

  titleStr: string = "Заголовок заметки";
  textStr: string = "Текст заметки";

  formSubmitButton: string = "Редактировать";

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

  @Output() onNoteEdited = new EventEmitter<boolean>();

  submitForm(): void {
    this.requestService
      .put('/api/note/edit/', this.formData, this.authorizationService.jwtString)
      .then(() => this.onNoteEdited.emit());
  }

  resetServerError(): void {
    this.serverError = null;
  }

}
