import { Component } from '@angular/core';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public title: string = 'NoSQL Laboratory Work';

  showAuthorizationForm(): void {
    alert("Show Login form!!!");
  }
}
