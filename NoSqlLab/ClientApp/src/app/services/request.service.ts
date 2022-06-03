import { Injectable } from "@angular/core";

@Injectable()
export class RequestService {

  post(address: string, postObj: object, jwt?: string) {

    return fetch(address, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${jwt}`,
      },
      body: JSON.stringify(postObj),
    })
      .then(async response => {
        if (response.ok) {
          try {
            return response.json();
          } catch {
            return {};
          }
        } else {
          throw Error((await response.json()).error);
        }
      });
  }

  put(address: string, postObj: object, jwt?: string) {

    return fetch(address, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${jwt}`,
      },
      body: JSON.stringify(postObj),
    })
      .then(async response => {
        if (response.ok) {
          try {
            return response.json();
          } catch {
            return { };
          }
        } else {
          throw Error((await response.json()).error);
        }
      });
  }

  get(address: string, jwt?: string) {

    return fetch(address, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${jwt}`,
      },
    })
      .then(async response => {
        if (response.ok) {
          try {
            return response.json();
          } catch {
            return { };
          }
        } else {
          throw Error((await response.json()).error);
        }
      });
  }
}
