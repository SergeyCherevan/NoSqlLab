import { Component, Input, OnInit } from '@angular/core';

import { ChangePasswordModel } from '../../models/change-password.model';

import { DictionaryService } from '../../services/dictionary.service';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'change-password-form',
  templateUrl: './change-password-form.component.html',
  providers: [ DictionaryService ],
})
export class ChangePasswordFormComponent implements OnInit {

  formData = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  formTitle: string = "Смена пароля";
  formSubmitButton: string = "Отправить";

  oldPasswordStr: string = "Старый пароль";
  newPasswordStr: string = "Новый пароль";
  confirmNewPasswordStr: string = "Подтвердите новый пароль";

  uncorrectPasswordStr: string = "Некорректный пароль. Не менее 4 буквенно-цифровых символов";
  uncorrectConfirmPasswordStr: string = "Пароли не совпадают";

  serverError?: Error;
  get firstSpanError(): string {

    return this.serverError ?
      this.dictionaryService.get(this.serverError.message)
      : this.uncorrectPasswordStr;
  }

  resetServerError() {
    this.serverError = undefined;
  }



  constructor(public dictionaryService: DictionaryService, public authorizationService: AuthorizationService) {

    dictionaryService.dictionary = new Map<string, string>([
      [ "Failed to fetch", "Ошибка соединения с сервером" ],
      [ "User not exists", "Пользователь не найден" ],
    ]);
  }

  ngOnInit(): void { }
  
  submitForm(): void {
    this.authorizationService.changePassword(<ChangePasswordModel>this.formData)
      .then(() => {
        let closeButton = document.getElementById("change-password-form-close-button");
        closeButton?.click();
      })
      .catch((err: Error) => this.serverError = err);
  }

}
