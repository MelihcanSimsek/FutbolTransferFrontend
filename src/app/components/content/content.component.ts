import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {faCheckCircle,faComment,faCommentAlt,faHeart,faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/models/auth/userModel';
import { PostDetailDto } from 'src/app/models/dtos/postDetailDto';
import { Fav } from 'src/app/models/entities/fav';
import { Post } from 'src/app/models/entities/post';
import { Verify } from 'src/app/models/entities/verify';
import { AuthService } from 'src/app/services/auth.service';
import { FavService } from 'src/app/services/fav.service';
import { PostService } from 'src/app/services/post.service';
import { RoleService } from 'src/app/services/role.service';
import { VerifyService } from 'src/app/services/verify.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  imageUrL = "https://localhost:7144/Uploads/images/";
  checkIcon = faCheckCircle;
  commentIcon = faComment;
  hearthIcon = faHeart;
  verifyIcon = faThumbsUp;
  postDetailDto:PostDetailDto[]=[];
  myFavs:number[]=[];
  myVerifies:number[]=[];
  constructor(
    private roleService:RoleService,
    private fromBuilder:FormBuilder,
    private postService:PostService,
    private toastService:ToastrService,
    private authService:AuthService,
    private router:Router,
    private verifyService:VerifyService,
    private favService:FavService) {
    
  }

  ngOnInit(): void {
    this.getMainPosts(this.authService.getUserInfo().id);
    this.getVerifies(this.authService.getUserInfo().id);
    this.getFavs(this.authService.getUserInfo().id);
    
  }

  getFavs(id:number)
  {
    this.favService.getFavs(id).subscribe(response=>{
      this.myFavs = response.data;
    })
  }

  getVerifies(id:number)
  {
    this.verifyService.getVerifies(id).subscribe(response=>{
      this.myVerifies = response.data;
    })
  }

  checkRoleForReporter(roles:string[])
  {
    return this.roleService.checkRolesForJournalist(roles)
  }

  getMainPosts(userId:number)
  {
    this.postService.getMainPost(userId).subscribe(response=>{
        this.postDetailDto = response.data;
    },responseError=>{
      console.log(responseError);
    })
  }


  getUserImage(post:PostDetailDto):string
  {
    let newUrl;
    if(post.profileImage == null)
    {
      newUrl = this.imageUrL + 'DefaultProfileImage.jpg';
    }
    else
    {
      newUrl = this.imageUrL + post.profileImage;
    }
    
    return newUrl;
  }

  checkCanUserSeeThis(status:boolean)
  {
    if(this.authService.getUserInfo().roles != undefined)
    {
      if(status == true && this.roleService.checkRolesForJournalist(this.authService.getUserInfo().roles))
      {
        return true;
      }
    }
    return false;
  }


  getFavClass(id:number)
  {
    
    if(this.myFavs.includes(id))
    {
      return "interactive-fas fav me-1 fav-active"
    }
    else
    {
      return "interactive-fas fav me-1"
    }
  }

  getVerifyClass(id:number)
  {
    
    if(this.myVerifies.includes(id))
    {
      return "interactive-fas verify me-1 verify-active"
    }
    else
    {
      return "interactive-fas verify me-1"
    }
  }

  favClick(id:number)
  {
    let favItem:Fav = Object.assign({
      userId:this.authService.getUserInfo().id,
      postId:id
    })
    if(!this.myFavs.includes(id))
    {
      this.myFavs.push(id);
      this.favService.add(favItem).subscribe(response=>{
        
      })
    }
    else{
      this.myFavs.splice(this.myFavs.indexOf(id),1);
      this.favService.delete(favItem).subscribe(response=>{

      })
    }
  }


  getPostFavCount(id:number,count:number,favArray:number[]){

    if(this.myFavs.includes(id) && this.favService.checkUserIsFav(this.authService.getUserInfo().id,favArray))
    {
      return count;
    }
    else if(!this.myFavs.includes(id) && this.favService.checkUserIsFav(this.authService.getUserInfo().id,favArray))
    {
      return count - 1;
    }
    else if(this.myFavs.includes(id) && !this.favService.checkUserIsFav(this.authService.getUserInfo().id,favArray))
    {
      return count + 1;
    }
    else{
      return count;
    }
  
  }

  getPostVerifyCount(id:number,count:number,VerifyArray:number[]){

    if(this.myVerifies.includes(id) && this.verifyService.checkUserIsVerified(this.authService.getUserInfo().id,VerifyArray))
    {
      return count;
    }
    else if(!this.myVerifies.includes(id) && this.verifyService.checkUserIsVerified(this.authService.getUserInfo().id,VerifyArray))
    {
      return count - 1;
    }
    else if(this.myVerifies.includes(id) && !this.verifyService.checkUserIsVerified(this.authService.getUserInfo().id,VerifyArray))
    {
      return count + 1;
    }
    else{
      return count;
    }
  
  }

  verifyClick(id:number)
  {
    let verifyItem:Verify  = Object.assign({
      userId:this.authService.getUserInfo().id,
      postId:id
    })
    if(!this.myVerifies.includes(id))
    {
      this.myVerifies.push(id);
      this.verifyService.add(verifyItem).subscribe(response=>{
        
      })
    }
    else
    {
      this.myVerifies.splice(this.myVerifies.indexOf(id),1);
      this.verifyService.delete(verifyItem).subscribe(response =>{

      })
    }
  }
  
 

 
}
