import { Injectable } from "@angular/core";

@Injectable()
export class RequestService {

  post(address: string, postObj: object) {

    return fetch(address, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(postObj),
    })
      .then(async response => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error((await response.json()).error);
        }
      });
  }
}
