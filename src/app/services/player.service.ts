import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/responseModel/listResponseModel';
import { Player } from '../models/entities/player';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  apiUrl = 'https://localhost:7144/api/';
  constructor(private httpClient:HttpClient) { }

  getPlayers(letter:string):Observable<ListResponseModel<Player>>
  {
    let newPath = this.apiUrl + 'Players/getall?letter='+letter;
    return this.httpClient.get<ListResponseModel<Player>>(newPath);
  }
}
