import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/responseModel/listResponseModel';
import { Observable } from 'rxjs';
import { Follower } from '../models/entities/follower';
import { ResponseModel } from '../models/responseModel/responseModel';

@Injectable({
  providedIn: 'root'
})
export class FollowerService {
  apiUrl = 'https://localhost:7144/api/';
  constructor(private  httpClient:HttpClient) { }

  getFollowersList(id:number):Observable<ListResponseModel<number>>
  {
    let newPath = this.apiUrl + 'Followers/getfollowerslist?id='+id;
    return this.httpClient.get<ListResponseModel<number>>(newPath);
  }

  getFollowedList(id:number):Observable<ListResponseModel<number>>
  {
    let newPath = this.apiUrl + 'Followers/getfollowedlist?id='+id;
    return this.httpClient.get<ListResponseModel<number>>(newPath);
  }

  add(follower:Follower):Observable<ResponseModel>
  {
    let newPath = this.apiUrl + 'Followers/add';
    return this.httpClient.post<ResponseModel>(newPath,follower);
  }

  delete(follower:Follower):Observable<ResponseModel>
  {
    let newPath = this.apiUrl + 'Followers/delete';
    return this.httpClient.post<ResponseModel>(newPath,follower);
  }
}
