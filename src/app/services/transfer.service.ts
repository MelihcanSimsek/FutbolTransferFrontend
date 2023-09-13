import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transfer } from '../models/entities/transfer';
import { ResponseModel } from '../models/responseModel/responseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  apiUrl = 'https://localhost:7144/api/';
  constructor(private httpClient:HttpClient) { }

  add(transfer:Transfer):Observable<ResponseModel>
  {
    let newPath = this.apiUrl + 'Transfers/add';
    return this.httpClient.post<ResponseModel>(newPath,transfer);
  }

}
