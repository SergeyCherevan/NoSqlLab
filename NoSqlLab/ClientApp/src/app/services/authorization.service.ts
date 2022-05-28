import { Injectable } from "@angular/core";

import { RequestService } from "./request.service";

import { UserApiModel } from '../models/user-api.model';

@Injectable()
export class AuthorizationService {

  username?: string;
  password?: string;

  jwtString?: string;
  jwtObject: any;

  constructor(public requestService: RequestService) { }

  login(formData: UserApiModel): Promise<any> {
    return this.requestService
      .post('/api/user/login', <UserApiModel>formData)
      .then(responseObject => this.saveDataInSevice(responseObject.jwt, formData))
      .then(() => this.saveDataInLocalStorage());
  }

  register(formData: UserApiModel): Promise<void> {
    return this.requestService
      .post('/api/user/register', <UserApiModel>formData)
      .then(() => this.login(formData));
  }

  saveDataInSevice(jwt: string, formData: UserApiModel): void {
    this.username = formData.username;
    this.password = formData.password;
    this.jwtString = jwt;
    this.jwtObject = this.decodeJwt(jwt);
  }

  decodeJwt(jwt: string): any {
    try {
      return JSON.parse(atob(jwt.split('.')[1]));
    } catch (err) {
      return null;
    }
  }

  saveDataInLocalStorage(): void {
    console.log(this.jwtObject);

    localStorage.setItem('username', this.username!);
    localStorage.setItem('password', this.password!);
  }

  loginByLocalStorageData(): void {
    let formData: UserApiModel = {
      username: localStorage.getItem('username')!,
      password: localStorage.getItem('password')!,
    };

    if (formData.username == null || formData.username == null) {
      return;
    }

    this.login(formData);
  }

  idTimeout?: number;

  startRegularLogin(): void {
    this.idTimeout =
      window.setInterval(() => this.login({
        username: this.username!,
        password: this.password!,
      }), 10_000);
  }

  logout(): void {
    this.username = this.password = this.jwtString = undefined
    this.jwtObject = undefined;

    localStorage.removeItem('id');
    localStorage.removeItem('username');
    localStorage.removeItem('password');
  }
}
