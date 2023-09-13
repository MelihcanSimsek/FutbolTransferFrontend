import { Injectable } from '@angular/core';
import { VerifiedRequest } from '../models/entities/verifiedRequest';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../models/responseModel/responseModel';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/responseModel/singleResponseModel';
import { ListResponseModel } from '../models/responseModel/listResponseModel';
import { RequestDto } from '../models/dtos/requestDto';

@Injectable({
  providedIn: 'root'
})
export class ApplyService {
  apiUrl = 'https://localhost:7144/api/';
  constructor(private httpClient:HttpClient) { }

  add(verifiedRequest:VerifiedRequest):Observable<ResponseModel>
  {
  let newPath = this.apiUrl  + 'VerifiedRequests/add';
  return this.httpClient.post<ResponseModel>(newPath,verifiedRequest);
  }

  delete(verifiedRequest:VerifiedRequest):Observable<ResponseModel>
  {
    let newPath = this.apiUrl  + 'VerifiedRequests/delete';
    return this.httpClient.post<ResponseModel>(newPath,verifiedRequest);
  }

  getRequestByUserId(id:number):Observable<SingleResponseModel<VerifiedRequest>>
  {
    let newPath = this.apiUrl + 'VerifiedRequests/getrequestbyuserid?id='+id;
    return this.httpClient.get<SingleResponseModel<VerifiedRequest>>(newPath);
  }

  getRequestById(id:number)
  {
    let newPath = this.apiUrl + 'VerifiedRequests/getrequestbyid?id='+id;
    return this.httpClient.get<SingleResponseModel<VerifiedRequest>>(newPath);
  }

  getAll():Observable<ListResponseModel<RequestDto>>
  {
    let newPath = this.apiUrl + 'VerifiedRequests/getall';
    return this.httpClient.get<ListResponseModel<RequestDto>>(newPath);
  }

}
