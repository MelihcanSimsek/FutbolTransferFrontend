import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faCheckCircle, faComment, faHeart, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { PostDetailDto } from 'src/app/models/dtos/postDetailDto';
import { TransferPostDto } from 'src/app/models/dtos/transferPostDto';
import { Fav } from 'src/app/models/entities/fav';
import { Post } from 'src/app/models/entities/post';
import { Verify } from 'src/app/models/entities/verify';
import { AuthService } from 'src/app/services/auth.service';
import { FavService } from 'src/app/services/fav.service';
import { PostService } from 'src/app/services/post.service';
import { RoleService } from 'src/app/services/role.service';
import { VerifyService } from 'src/app/services/verify.service';


@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {
  imageUrL = "https://localhost:7144/Uploads/images/";
  checkIcon = faCheckCircle;
  commentIcon = faComment;
  hearthIcon = faHeart;
  verifyIcon = faThumbsUp;
  postDetail:PostDetailDto;
  transferPost:TransferPostDto;
  comments:PostDetailDto[]=[];
  commentForm:FormGroup;
  currentPostId:number;
  favs:number[] = [];
  verify:number[] = [];
  constructor(
    private favService:FavService,
    private verifyService:VerifyService,
    private activatedRouter:ActivatedRoute,
    private postService:PostService,
    private roleService:RoleService,
    private authService:AuthService,
    private formbuilder:FormBuilder,
    private toastrService:ToastrService
  ) {
    
  }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(params=>{
      this.currentPostId = Number(params['postId']);
      this.getPostDetailById(this.currentPostId);
      this.getFavs(this.currentPostId);
      this.getVerify(this.currentPostId);
      this.getComments(this.currentPostId);
      
    })
    this.createCommentForm();
  }

  getPostDetailById(id:number)
  {
    this.postService.getPostDetailById(id).subscribe(response=>{
        this.postDetail = response.data;
        if(response.data.status == true)
        {
          this.getTransferPostById(id);
        }
    })
  }

  getTransferPostById(id:number)
  {
    this.postService.getTransferPostById(id).subscribe(response=>{
      this.transferPost = response.data;
    })
  }
  
  getTransferRate(transferRate:number)
  {
    return 'width:'+transferRate+'%';
  }

  getComments(id:number)
  {
    this.postService.getComments(id,this.authService.getUserInfo().id).subscribe(response=>{
      this.comments = response.data;
    })
  }

  createCommentForm()
  {
    this.commentForm = this.formbuilder.group({
      commentContent:['',Validators.required]
    })
  }

  getFavs(id:number)
  {
    this.favService.getPostCommentFavs(this.authService.getUserInfo().id,id).subscribe(response=>{
      this.favs = response.data;
    })
  }

  getVerify(id:number)
  {
    this.verifyService.getVerify(this.authService.getUserInfo().id,id).subscribe(response=>{
      this.verify = response.data;
    })
  }

  comment(){
    if(this.commentForm.valid)
    {
      let postItem:Post = Object.assign({
        id: 0,
        userId: this.authService.getUserInfo().id,
        comment: 0,
        content:this.commentForm.value.commentContent,
        parentId: this.currentPostId,
        status: false,
        creationDate: new Date()
      })

      this.postService.post(postItem).subscribe(response=>{
        this.toastrService.success('Yorum Gönderildi', 'Başarılı');
        setTimeout(() => {
          location.reload();
        }, 1000);
      })
    }
    else
    {
      this.toastrService.info("Lütfen yorum alanını doldurun","Yorum Boş");
    }
  }

  getUserImage(image:string)
  {
    let newUrl;
    if(image == null)
    {
      newUrl = this.imageUrL + 'DefaultProfileImage.jpg';
    }
    else
    {
      newUrl = this.imageUrL + image;
    }
    
    return newUrl;
  }

  checkRoleForReporter(roles:string[])
  {
    return this.roleService.checkRolesForJournalist(roles)
  }

  getFavClass(id:number)
  {
    
    if(this.favs.includes(id))
    {
      return "interactive-fas fav me-1 fav-active"
    }
    else
    {
      return "interactive-fas fav me-1"
    }
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

  getVerifyClass(id:number)
  {
    
    if(this.verify.includes(id))
    {
      return "interactive-fas verify me-1 verify-active"
    }
    else
    {
      return "interactive-fas verify me-1"
    }
  }


  getPostVerifyCount(id:number,count:number,VerifyArray:number[]){

    if(this.verify.includes(id) && this.verifyService.checkUserIsVerified(this.authService.getUserInfo().id,VerifyArray))
    {
      return count;
    }
    else if(!this.verify.includes(id) && this.verifyService.checkUserIsVerified(this.authService.getUserInfo().id,VerifyArray))
    {
      return count - 1;
    }
    else if(this.verify.includes(id) && !this.verifyService.checkUserIsVerified(this.authService.getUserInfo().id,VerifyArray))
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
    if(!this.verify.includes(id))
    {
      this.verify.push(id);
      this.verifyService.add(verifyItem).subscribe(response=>{
        
      })
    }
    else
    {
      this.verify.splice(this.verify.indexOf(id),1);
      this.verifyService.delete(verifyItem).subscribe(response =>{

      })
    }
  }
  
  

  favClick(id:number)
  {
    let favItem:Fav = Object.assign({
      userId:this.authService.getUserInfo().id,
      postId:id
    })
    if(!this.favs.includes(id))
    {
      this.favs.push(id);
      this.favService.add(favItem).subscribe(response=>{
        
      })
    }
    else{
      this.favs.splice(this.favs.indexOf(id),1);
      this.favService.delete(favItem).subscribe(response=>{

      })
    }

    
  }


  getPostFavCount(id:number,count:number,favArray:number[]){

    if(this.favs.includes(id) && this.favService.checkUserIsFav(this.authService.getUserInfo().id,favArray))
    {
      return count;
    }
    else if(!this.favs.includes(id) && this.favService.checkUserIsFav(this.authService.getUserInfo().id,favArray))
    {
      return count - 1;
    }
    else if(this.favs.includes(id) && !this.favService.checkUserIsFav(this.authService.getUserInfo().id,favArray))
    {
      return count + 1;
    }
    else{
      return count;
    }
  
  }

  getPlayerImage(playerImage:string)
  {
    if (playerImage.includes('localhost:7103')) {
      return this.imageUrL + 'DefaultPlayerImage.jpg';
    }
    return playerImage;
  }
}
