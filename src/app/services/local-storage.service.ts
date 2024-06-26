import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getItem(key:string)
  {
    let json = localStorage.getItem(key);
    let value = JSON.parse(json);
    return value;
  }

  setItem(key:string,value:any)
  {
    let json = JSON.stringify(value);
    localStorage.setItem(key,json);
  }

  remove(key:string)
  {
    localStorage.removeItem(key);
  }

  removeAll()
  {
    localStorage.clear();
  }
}
