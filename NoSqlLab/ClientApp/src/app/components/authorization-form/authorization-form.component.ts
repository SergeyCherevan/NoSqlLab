import { Component, OnInit } from '@angular/core';
import { UserApiModel } from '../../models/user-api.model';
import { DictionaryService } from '../../services/dictionary.service';
import { RequestService } from '../../services/request.service';



@Component({
  selector: 'authorization-form',
  templateUrl: './authorization-form.component.html',
  providers: [DictionaryService, RequestService],
})
export class AuthorizationFormComponent implements OnInit {

  formData = {
    username: "",
    password: "",
    confirmPassword: "",
  };



  readonly isLogin = 0; readonly isReg = 1;
  isLoginOrReg: number = this.isLogin;
  loginOrRegTitle: string[] = ["Вход", "Регистрация"];
  loginOrRegSubmitButton: string[] = ["Войти", "Зарегистрироваться"];

  get formTitle(): string {
    return this.loginOrRegTitle[this.isLoginOrReg];
  }

  get formSubmitButton(): string {
    return this.loginOrRegSubmitButton[this.isLoginOrReg];
  }

  get formSwitchingButton(): string {
    return this.loginOrRegTitle[(this.isLoginOrReg + 1) % 2];
  }



  usernameStr: string = "Имя пользователя";
  passwordStr: string = "Пароль";
  confirmPasswordStr: string = "Подтвердите пароль";

  uncorrectUsernameStr: string = "Некорректное имя пользователя. Не менее 4 буквенно-цифровых символов";
  uncorrectPasswordStr: string = "Некорректный пароль. Не менее 4 буквенно-цифровых символов";
  uncorrectConfirmPasswordStr: string = "Пароли не совпадают";

  serverError: Error|null = null;
  get firstSpanError(): string {

    return this.serverError ?
        this.dictionaryService.get(this.serverError.message)
      : this.uncorrectUsernameStr;
  }

  resetServerError() {
    this.serverError = null;
  }



  constructor(public dictionaryService: DictionaryService, public requestService: RequestService) {

    dictionaryService.dictionary = new Map<string, string>([
      ["User already exist", "Такой пользователь уже существует"],
      ["Failed to fetch", "Ошибка соединения с сервером"],
      ["User not exists", "Пользователь не найден"]
    ]);
  }

  ngOnInit(): void { }

  switchForm(): void {
    this.isLoginOrReg = (this.isLoginOrReg + 1) % 2;
  }

  submitForm(): void {
    if (this.isLoginOrReg == this.isLogin) {
      this.login();
    } else if (this.isLoginOrReg == this.isReg) {
      this.register();
    }
  }

  login(): void {
    this.requestService
      .post('/api/user/login', this.formData)
      .then(() => alert(`login: ${document.cookie}`))
      .catch((err: Error) => this.serverError = err);
  }

  register(): void {
    this.requestService
      .post('/api/user/register', this.formData)
      .then(() => this.requestService.post('/api/user/login', this.formData))
      .then(() => alert(`register: ${document.cookie}`))
      .catch((err: Error) => this.serverError = err);
  }
}
