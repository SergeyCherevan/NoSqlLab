import { Component, OnInit, Input } from '@angular/core';

import { NoteResponseModel } from '../../models/note-response.model';

@Component({
  selector: 'note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {

  @Input() noteModel: NoteResponseModel = {
    id: "",
    title: "",
    text: "",
    userName: "",
    lastUpdate: new Date(),
  };

  get titleInnerHTML() {
    return this.noteModel.title.split('  ').join(' &nbsp;');
  }

  get textInnerHTML() {
    return this.noteModel.text.split('  ').join(' &nbsp;').split('\n').join('<br>');
  }

  constructor() { }

  ngOnInit(): void { }

}
