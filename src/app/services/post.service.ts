import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/responseModel/listResponseModel';
import { PostDetailDto } from '../models/dtos/postDetailDto';
import { Post } from '../models/entities/post';
import { ResponseModel } from '../models/responseModel/responseModel';
import { TransferPostDto } from '../models/dtos/transferPostDto';
import { SingleResponseModel } from '../models/responseModel/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  apiUrl = 'https://localhost:7144/api/';
  constructor(private httpClient:HttpClient) { }

  post(postItem:Post):Observable<SingleResponseModel<Post>>
  {
    let newPath = this.apiUrl + 'Posts/add';
    return this.httpClient.post<SingleResponseModel<Post>>(newPath,postItem);
  }

  getMainPost(userId:number):Observable<ListResponseModel<PostDetailDto>>
  {
    let newPath = this.apiUrl + 'Posts/getmainpost?id='+userId;
    return this.httpClient.get<ListResponseModel<PostDetailDto>>(newPath);
  }

  getTransferPost():Observable<ListResponseModel<TransferPostDto>>
  {
    let newPath = this.apiUrl + 'Posts/gettransferposts';
    return this.httpClient.get<ListResponseModel<TransferPostDto>>(newPath);
  }

  getPostDetailById(id:number):Observable<SingleResponseModel<PostDetailDto>>
  {
    let newPath = this.apiUrl + 'Posts/getpostdetailbyid?id='+id;
    return this.httpClient.get<SingleResponseModel<PostDetailDto>>(newPath);
  }

  getTransferPostById(id:number):Observable<SingleResponseModel<TransferPostDto>>
  {
    let newPath = this.apiUrl + 'Posts/gettransferpostbyid?id='+id;
    return this.httpClient.get<SingleResponseModel<TransferPostDto>>(newPath);
  }

  getComments(postId:number,userId:number):Observable<ListResponseModel<PostDetailDto>>
  {
    let newPath = this.apiUrl + 'Posts/getcommentsbypostid?postId='+postId+'&userId='+userId;
    return this.httpClient.get<ListResponseModel<PostDetailDto>>(newPath);
  }

  getDailyTransferPost():Observable<ListResponseModel<TransferPostDto>>
  {
    let newPath = this.apiUrl + 'Posts/getdailytransferpost';
    return this.httpClient.get<ListResponseModel<TransferPostDto>>(newPath);
  }


  getWeeklyTransferPost():Observable<ListResponseModel<TransferPostDto>>
  {
    let newPath = this.apiUrl + 'Posts/getweeklytransferpost';
    return this.httpClient.get<ListResponseModel<TransferPostDto>>(newPath);
  }

  getMonthlyTransferPost():Observable<ListResponseModel<TransferPostDto>>
  {
    let newPath = this.apiUrl + 'Posts/getmonthlytransferpost';
    return this.httpClient.get<ListResponseModel<TransferPostDto>>(newPath);
  }


  getByUserId(id:number):Observable<ListResponseModel<PostDetailDto>>
  {
    let newPath = this.apiUrl + 'Posts/getbyuserid?id='+id;
    return this.httpClient.get<ListResponseModel<PostDetailDto>>(newPath);
  }
}
