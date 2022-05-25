import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'authorization-form',
  templateUrl: './authorization-form.component.html',
  styleUrls: ['./authorization-form.component.scss']
})
export class AuthorizationFormComponent implements OnInit {

  isLoginOrReg: boolean = false;
  loginOrRegTitle: string[] = ["Вход", "Регистрация"];
  loginOrRegSubmitButton: string[] = ["Войти", "Зарегистрироваться"];

  get formTitle(): string {
    return this.loginOrRegTitle[Number(this.isLoginOrReg)];
  }

  get formSubmitButton(): string {
    return this.loginOrRegSubmitButton[Number(this.isLoginOrReg)];
  }

  get formSwitchingButton(): string {
    return this.loginOrRegTitle[Number(!this.isLoginOrReg)];
  }

  loginStr: string = "Логин";
  passwordStr: string = "Пароль";
  confirmPasswordStr: string = "Подтвердите пароль";

  constructor() { }

  ngOnInit(): void { }

  switchForm(): void {
    this.isLoginOrReg = !this.isLoginOrReg;
  }
}
