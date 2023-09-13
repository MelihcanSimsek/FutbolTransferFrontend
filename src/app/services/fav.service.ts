import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fav } from '../models/entities/fav';
import { ResponseModel } from '../models/responseModel/responseModel';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/responseModel/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class FavService {
  apiUrl = 'https://localhost:7144/api/';
  constructor(private httpClient:HttpClient) { }

  checkUserIsFav(id:number,fav:number[])
  {
    
    if(typeof fav == 'number')
    {
      if(fav == id)
      {
        return true;
      }
    }

    for (let i = 0; i < fav.length; i++) {
      if(fav[i] == id)
      {
        return true;
      }
      
    }
    return false;
  }

  add(fav:Fav):Observable<ResponseModel>
  {
    
    let newPath = this.apiUrl + 'Favs/add';
    return this.httpClient.post<ResponseModel>(newPath,fav);
  }

  delete(fav:Fav):Observable<ResponseModel>
  {
    let newPath = this.apiUrl + 'Favs/delete';
    return this.httpClient.post<ResponseModel>(newPath,fav);
  }

  getFavs(id:number):Observable<ListResponseModel<number>>
  {
    let newPath = this.apiUrl + 'Favs/getall?id='+id;
    return this.httpClient.get<ListResponseModel<number>>(newPath)
  }

  getPostCommentFavs(userid:number,postid:number):Observable<ListResponseModel<number>>
  {
    let newPath = this.apiUrl + 'Favs/getpostcommentsfav?userid='+userid+'&postid='+postid;
    return this.httpClient.get<ListResponseModel<number>>(newPath);
  }

}
