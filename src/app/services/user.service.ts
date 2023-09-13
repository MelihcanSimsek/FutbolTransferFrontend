import { Injectable } from '@angular/core';
import { User } from '../models/entities/user';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../models/responseModel/responseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'https://localhost:7144/api/';
  constructor(private httpClient:HttpClient) { }

  update(user:User):Observable<ResponseModel>
  {
    let newPath = this.apiUrl + 'Users/update';
    return this.httpClient.post<ResponseModel>(newPath,user);
  }
}
