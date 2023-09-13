import { STRING_TYPE } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { UserOperationClaim } from '../models/entities/userOperationClaim';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../models/responseModel/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  apiUrl = 'https://localhost:7144/api/';
  constructor(private httpClient:HttpClient) { }

  checkRolesForJournalist(roles:string[])
  {
    if(typeof roles == 'string')
    {
      if(roles == "reporter"){
        return true;
      }
    }

    for (let i = 0; i < roles.length; i++) {
      
      if(roles[i] == "reporter")
      {
        return true;
      }
    }
    return false;
  }

  checkRolesForAdmin(roles:string[])
  {
    if(typeof roles == 'string')
    {
      if(roles == "admin"){
        return true;
      }
    }

    for (let i = 0; i < roles.length; i++) {
      
      if(roles[i] == "admin")
      {
        return true;
      }
    }
    return false;
  }

  add(userOperationClaim:UserOperationClaim)
  {
    let newPath = this.apiUrl + 'UserOperationClaims/add';
    return this.httpClient.post<ResponseModel>(newPath,userOperationClaim);
  }


}
