import { Component, OnInit } from '@angular/core';
import { UserApiModel } from '../models/user-api.model';

@Component({
  selector: 'authorization-form',
  templateUrl: './authorization-form.component.html',
  styleUrls: ['./authorization-form.component.scss']
})
export class AuthorizationFormComponent implements OnInit {

  formData = {
    username: "",
    password: "",
    confirmPassword: "",
  };

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

  usernameStr: string = "Имя пользователя";
  passwordStr: string = "Пароль";
  confirmPasswordStr: string = "Подтвердите пароль";

  uncorrectUsernameStr: string = "Некорректное имя пользователя. Не менее 4 буквенно-цифровых символов";
  uncorrectPasswordStr: string = "Некорректный пароль. Не менее 4 буквенно-цифровых символов";
  uncorrectConfirmPasswordStr: string = "Пароли не совпадают";

  constructor() { }

  ngOnInit(): void { }

  switchForm(): void {
    this.isLoginOrReg = !this.isLoginOrReg;
  }

  submitForm(): void {
    alert("Отправка формы");
  }
}
