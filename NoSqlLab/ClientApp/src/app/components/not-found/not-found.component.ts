import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'not-found',
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent implements OnInit {

  title: string = "Такая страница не найдена";

  constructor() { }

  ngOnInit(): void {
  }

}
