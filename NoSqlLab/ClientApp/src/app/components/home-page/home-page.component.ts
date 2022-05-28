import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {

  title: string[] = [ "Лабораторная работа", "по дисциплине «NoSQL-системы»" ];

  constructor() { }

  ngOnInit(): void {
  }

}
