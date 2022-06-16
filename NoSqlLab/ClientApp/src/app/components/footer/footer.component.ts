import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {

  @Input() title: string = "";

  sectionStr: string = "Секции";
  homeStr: string = "Домашняя";
  usersStr: string = "Пользователи";

  get copyrightStr(): string {
    return `© 2022 ${this.title}, Inc. All rights reserved.`;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
