import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../models/auth/loginModel';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/responseModel/singleResponseModel';
import { TokenModel } from '../models/auth/tokenModel';
import { RegisterModel } from '../models/auth/registerModel';
import { LocalStorageService } from './local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserModel } from '../models/auth/userModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient:HttpClient,
    private jwtHelperService:JwtHelperService,
    private localStorageService:LocalStorageService) { }
  apiUrl = 'https://localhost:7144/api/';
  user:UserModel;

  login(loginModel:LoginModel):Observable<SingleResponseModel<TokenModel>>{
    let newPath = this.apiUrl +  'Auth/login';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,loginModel);
  }

  register(registerModel:RegisterModel):Observable<SingleResponseModel<TokenModel>>{
    let newPath = this.apiUrl + 'Auth/register';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,registerModel);
  }

  isAuthenticated()
  {
    if(this.localStorageService.getItem('token'))
    {
      return true;
    }
    return false;
  }


  decodedToken(token:any)
  {
    return this.jwtHelperService.decodeToken(token);
  }

  loggedIn()
  {
    return this.jwtHelperService.isTokenExpired(this.localStorageService.getItem('token'));
  }

  getUserInfo()
  {
    let decodedToken = this.decodedToken(this.localStorageService.getItem('token'));
    if(decodedToken)
    {
      if(this.loggedIn())
      {
        let tokenInfoName = Object.keys(decodedToken).filter(x=>x.endsWith("/name"))[0];
        var name  = String(decodedToken[tokenInfoName]);

        let tokenInfoId = Object.keys(decodedToken).filter(x=>x.endsWith("/nameidentifier"))[0];
        var userId = Number(decodedToken[tokenInfoId]);

        let claimInfo = Object.keys(decodedToken).filter(x=>x.endsWith("/role"))[0];
        var roles = decodedToken[claimInfo];

        var emailInfo = decodedToken.email;

        this.user = {
          email:emailInfo,
          id:userId,
          name:name,
          roles:roles
        }
      }
    }
    return this.user;
  }
}
