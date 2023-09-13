import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/responseModel/listResponseModel';
import { Club } from '../models/entities/club';
import { SingleResponseModel } from '../models/responseModel/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ClubService {
  apiUrl = 'https://localhost:7144/api/';
  constructor(private httpClient:HttpClient) { }

  getClubs(letter:string):Observable<ListResponseModel<Club>>
  {
    let newPath = this.apiUrl+ 'Clubs/getall?letter='+letter;
    return this.httpClient.get<ListResponseModel<Club>>(newPath);
  } 

}
