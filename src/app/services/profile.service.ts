import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/responseModel/singleResponseModel';
import { Profile } from '../models/entities/profile';
import { UserInformationDto } from '../models/dtos/userInformationDto';
import { ResponseModel } from '../models/responseModel/responseModel';



@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  apiUrl = 'https://localhost:7144/api/';
  constructor(private httpClient:HttpClient) { }

  getUserProfile(userId:number):Observable<SingleResponseModel<Profile>>
  {
    let newPath = this.apiUrl + 'Profiles/getbyuserid?id='+userId;
    return this.httpClient.get<SingleResponseModel<Profile>>(newPath);
  }

  getUserInformation(id:number):Observable<SingleResponseModel<UserInformationDto>>
  {
    let newPath = this.apiUrl + 'Users/getuserinformationbyid?id='+id;
    return this.httpClient.get<SingleResponseModel<UserInformationDto>>(newPath);
  }

  update(profile:Profile):Observable<ResponseModel>
  {
    let newPath = this.apiUrl + 'Profiles/update';
    return this.httpClient.post<ResponseModel>(newPath,profile);
  }

  backgorundImageUpdate(file:File,profile:Profile):Observable<ResponseModel>
  {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('id', profile.id.toString());
    let newPath = this.apiUrl + 'Profiles/backgroundimageupdate';
    return this.httpClient.post<ResponseModel>(newPath,formData);
  }


  profileImageUpdate(file:File,profile:Profile):Observable<ResponseModel>
  {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('id', profile.id.toString());
    let newPath = this.apiUrl + 'Profiles/profileimageupdate';
    return this.httpClient.post<ResponseModel>(newPath,formData);
  }
}
