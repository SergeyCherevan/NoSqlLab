import { Component, OnInit, Input } from '@angular/core';

import { NoteModel } from '../../models/note.model';

@Component({
  selector: 'note',
  templateUrl: './note.component.html',
})
export class NoteComponent implements OnInit {

  @Input() noteModel: NoteModel = {
    id: "",
    title: "",
    text: "",
    userName: "",
    lastUpdate: new Date(),
  };

  constructor() { }

  ngOnInit(): void {

  }

}
