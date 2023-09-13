import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Verify } from '../models/entities/verify';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel/responseModel';
import { ListResponseModel } from '../models/responseModel/listResponseModel';
import { SingleResponseModel } from '../models/responseModel/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class VerifyService {
  apiUrl = 'https://localhost:7144/api/';
  constructor(private httpClient:HttpClient) { }


  checkUserIsVerified(id:number,verify:number[])
  {

    if(typeof verify == 'number')
    {
      if(id == verify)
      {
        return true;
      }
    }

    for (let i = 0; i < verify.length; i++) {
        if(verify[i] == id)
        {
          return true;
        }
    }
    return false;
  }

  getVerifies(id:number):Observable<ListResponseModel<number>>
  {
    let newPath = this.apiUrl + 'Verifies/getall?id='+id;
    return this.httpClient.get<ListResponseModel<number>>(newPath);
  }

  add(verify:Verify):Observable<ResponseModel>
  {
    let newPath = this.apiUrl + 'Verifies/add';
    return this.httpClient.post<ResponseModel>(newPath,verify)
  }

  delete(verify:Verify):Observable<ResponseModel>
  {
    let newPath = this.apiUrl + 'Verifies/delete';
    return this.httpClient.post<ResponseModel>(newPath,verify);
  }
  
  getVerify(userId:number,postId:number):Observable<ListResponseModel<number>>
  {
    let newPath = this.apiUrl + 'Verifies/getverify?userid='+userId+'&postid='+postId;
    return this.httpClient.get<ListResponseModel<number>>(newPath);
  }
}
