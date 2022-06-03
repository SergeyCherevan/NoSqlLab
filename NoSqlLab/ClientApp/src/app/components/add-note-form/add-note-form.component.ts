import { Component, OnInit } from '@angular/core';

import { NoteApiModel } from '../../models/note-api.model';

import { DictionaryService } from '../../services/dictionary.service';

@Component({
  selector: 'add-note-form',
  templateUrl: './add-note-form.component.html',
  providers: [DictionaryService],
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

  constructor(public dictionaryService: DictionaryService) { }

  ngOnInit(): void {
  }

  submitForm(): void {

  }

  resetServerError(): void {

  }

}
