import { Injectable } from "@angular/core";

@Injectable()
export class RequestService {

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
            return {};
          }
        } else {
          throw Error((await response.json()).error);
        }
      });
  }

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

  delete(address: string, postObj?: object, jwt?: string) {

    return fetch(address, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${jwt}`,
      },
      body: postObj ? JSON.stringify(postObj) : undefined,
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
}
