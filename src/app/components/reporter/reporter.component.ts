import { Component, OnInit } from '@angular/core';
import { faCheckCircle, faComment, faHeart, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { TransferPostDto } from 'src/app/models/dtos/transferPostDto';
import { Club } from 'src/app/models/entities/club';
import { Fav } from 'src/app/models/entities/fav';
import { Verify } from 'src/app/models/entities/verify';
import { AuthService } from 'src/app/services/auth.service';
import { ClubService } from 'src/app/services/club.service';
import { FavService } from 'src/app/services/fav.service';
import { PostService } from 'src/app/services/post.service';
import { RoleService } from 'src/app/services/role.service';
import { VerifyService } from 'src/app/services/verify.service';

@Component({
  selector: 'app-reporter',
  templateUrl: './reporter.component.html',
  styleUrls: ['./reporter.component.css']
})
export class ReporterComponent implements OnInit{
  imageUrL = "https://localhost:7144/Uploads/images/";
  checkIcon = faCheckCircle;
  commentIcon = faComment;
  hearthIcon = faHeart;
  verifyIcon = faThumbsUp;
  transferPostDto:TransferPostDto[] = [];
  myFavs:number[] = [];
  myVerifies:number[]=[];
  constructor(private postService:PostService,
    private authService:AuthService,
    private roleService:RoleService,
    private clubService:ClubService,
    private favService:FavService,
    private verifyService:VerifyService) {
    
  }

  ngOnInit(): void {
      this.getTransferPosts();
      this.getFavs(this.authService.getUserInfo().id);
      this.getVerifies(this.authService.getUserInfo().id);
    
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
      this.myVerifies = response.data
    })
  }

  getTransferPosts()
  {
    this.postService.getTransferPost().subscribe(response=>{
      this.transferPostDto = response.data;
    },responseError=>{
      console.log(responseError)
    })
  }

  checkRoleForReporter(roles:string[])
  {
    return this.roleService.checkRolesForJournalist(roles)
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

  getUserImage(post:TransferPostDto):string
  {
    let newUrl;
    if(post.userProfileImage == null)
    {
      newUrl = this.imageUrL + 'DefaultProfileImage.jpg';
    }
    else
    {
      newUrl = this.imageUrL + post.userProfileImage;
    }
    
    return newUrl;
  }

  getPlayerImage(playerImage:string)
  {
    if (playerImage.includes('localhost:7103')) {
      return this.imageUrL + 'DefaultPlayerImage.jpg';
    }
    return playerImage;
  }

  favClicked(id:number)
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


  verifyClicked(id:number){
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

  getPostVerifyCount(id:number,count:number,verifyArray:number[])
  {
    if(this.myVerifies.includes(id) && this.verifyService.checkUserIsVerified(this.authService.getUserInfo().id,verifyArray))
    {
      return count;
    }
    else if(!this.myVerifies.includes(id) && this.verifyService.checkUserIsVerified(this.authService.getUserInfo().id,verifyArray))
    {
      return count - 1;
    }
    else if(this.myVerifies.includes(id) && !this.verifyService.checkUserIsVerified(this.authService.getUserInfo().id,verifyArray))
    {
      return count + 1;
    }
    else{
      return count;
    }
  }

  getPostFavCount(id:number,count:number,favArray:number[])
  {
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
 
}
