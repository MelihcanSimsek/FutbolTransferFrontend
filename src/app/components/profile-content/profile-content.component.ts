import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faCalendarDays, faCheckCircle, faLink, faLocation, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { PostDetailDto } from 'src/app/models/dtos/postDetailDto';
import { UserInformationDto } from 'src/app/models/dtos/userInformationDto';
import { Follower } from 'src/app/models/entities/follower';
import { Profile } from 'src/app/models/entities/profile';
import { User } from 'src/app/models/entities/user';
import { AuthService } from 'src/app/services/auth.service';
import { FollowerService } from 'src/app/services/follower.service';
import { PostService } from 'src/app/services/post.service';
import { ProfileService } from 'src/app/services/profile.service';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-content',
  templateUrl: './profile-content.component.html',
  styleUrls: ['./profile-content.component.css']
})
export class ProfileContentComponent implements OnInit{
  checkIcon = faCheckCircle;
  calendar = faCalendarDays;
  location = faLocationDot;
  link = faLink;
  profile:Profile;
  currentUser:UserInformationDto;
  imageUrL = "https://localhost:7144/Uploads/images/";
  currentUserId:number;
  followerList:number[]=[];
  followedList:number[]=[];
  postDetail:PostDetailDto[]=[];
  profileForm:FormGroup= new FormGroup({
    username:new FormControl("",Validators.required),
    description:new FormControl(""),
    location:new FormControl(""),
    website:new FormControl("")
  });
  profileImageFile:any = undefined;
  backgroundImageFile:any = undefined;

  constructor(private authService:AuthService,
    private profileService:ProfileService,
    private activatedRouter:ActivatedRoute,
    private roleService:RoleService,
    private followerService:FollowerService,
    private postService:PostService,
    private toastrService:ToastrService,
    private userService:UserService) {

  }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(params=>{
      this.currentUserId = Number(params['userId']);
      this.getProfile(this.currentUserId);
      this.getFollowerList(this.currentUserId);
      this.getFollowedList(this.currentUserId);
      this.getPosts(this.currentUserId);
    })
  }

  createProfileUpdateFrom()
  {
    this.profileForm.setValue({
      username:this.currentUser.userName,
      description:this.profile.description,
      location:this.profile.location,
      website:this.profile.webSite
    })
  }

  getPosts(id:number)
  {
    this.postService.getByUserId(id).subscribe(response=>{
      this.postDetail = response.data;
    })
  }

  getFollowerList(id:number)
  {
    this.followerService.getFollowersList(id).subscribe(response=>{
      this.followerList = response.data;
    })
  }

  getFollowedList(id:number)
  {
    this.followerService.getFollowedList(id).subscribe(response=>{
      this.followedList = response.data;
    })

  }

  
  getUserInformation(id:number)
  {
    this.profileService.getUserInformation(id).subscribe(response=>{
      this.currentUser = response.data;
      this.createProfileUpdateFrom();
    })
  }

  getProfile(id:number)
  {
    this.profileService.getUserProfile(id).subscribe(response=>{
      this.profile = response.data;
      this.getUserInformation(id);
    })
  }

  getUserBackgroundImage(backgroundImage:string):string
  {
    let newUrl;
    if(backgroundImage == null)
    {
      newUrl = this.imageUrL + 'DefaultBackgroundImage.jpg';
    }
    else
    {
      newUrl = this.imageUrL + backgroundImage;
    }
    
    return newUrl;
  }


  getUserImage(profileImage:string):string
  {
    let newUrl;
    if(profileImage == null)
    {
      newUrl = this.imageUrL + 'DefaultProfileImage.jpg';
    }
    else
    {
      newUrl = this.imageUrL + profileImage;
    }
    
    return newUrl;
  }

  checkRoleForReporter(roles:string[])
  {
    return this.roleService.checkRolesForJournalist(roles)
  }

  checkUserFollowersList()
  {
    if(this.followerList.includes(this.authService.getUserInfo().id))
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  isUserOwnProfile()
  {
    if(this.authService.getUserInfo().id == this.currentUserId)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  follow()
  {
    let followItem:Follower = Object.assign({
      followerId:this.authService.getUserInfo().id,
      followedId:this.currentUserId
    })
    this.followerService.add(followItem).subscribe
    (response=>{
      this.followerList.push(this.authService.getUserInfo().id)
    })

  }

  unFollow()
  {
    let followItem:Follower = Object.assign({
      followerId:this.authService.getUserInfo().id,
      followedId:this.currentUserId
    })

    this.followerService.delete(followItem).subscribe(response=>{
      this.followerList.splice(this.followerList.indexOf(this.authService.getUserInfo().id),1);
    })
  }

  checkUserInformation(){
    if(this.currentUser != undefined)
    {
      return true;
    }
    else{
      return false;
    }
  }

  onProfileImageFileSelected(event: any) {
    if (event.target.files && event.target.files.length) {
      this.profileImageFile = event.target.files[0];
    }

  }

  onBackgroundImageFileSelected(event: any) {
    if (event.target.files && event.target.files.length) {
      this.backgroundImageFile = event.target.files[0];
    }
  }

  update()
  {
    if(this.profileForm.valid)
    {
      if(this.profileForm.value.username.length > 2){
        let userItem:User = Object.assign({
          id:this.currentUser.userId,
          name:this.profileForm.value.username
        });
        let profileItem:Profile = Object.assign({
          id:this.profile.id,
          userId:this.profile.userId,
          description:this.profileForm.value.description,
          location:this.profileForm.value.location,
          webSite:this.profileForm.value.website
        })
        this.userService.update(userItem).subscribe(response=>{
          this.profileService.update(profileItem).subscribe(newResponse=>{
            if(this.profileImageFile != undefined)
            {
              this.profileService.profileImageUpdate(this.profileImageFile,profileItem).subscribe(response=>{
                if(this.backgroundImageFile != undefined)
                {
                  this.profileService.backgorundImageUpdate(this.backgroundImageFile,profileItem).subscribe(newResponse=>{
    
                  })
                }
              })
            }
            else if(this.backgroundImageFile != undefined)
            {
              this.profileService.backgorundImageUpdate(this.backgroundImageFile,profileItem).subscribe(response=>{

              })
             
            }
            this.toastrService.success("Profil başarıyla güncellendi","Güncelleme Başarılı");
            setTimeout(() => {
              location.reload();
            }, 1000);

          })
        })
      }
      else
      {
        this.toastrService.info("Kullanıcı adı en az 3 karakter olmalıdır.","Kullanıcı Adı Yetersiz");
      }
    }
    else
    {
      this.toastrService.info("Kullanıcı adı boş olamaz.","Kullanıcı Adı Boş");
    }
  }
  
}
