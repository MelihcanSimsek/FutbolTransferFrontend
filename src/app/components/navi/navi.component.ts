import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowRightArrowLeft, faEnvelope, faGear, faHome,faRss, faUser,faUserPlus,faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { UserModel } from 'src/app/models/auth/userModel';
import { Profile } from 'src/app/models/entities/profile';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProfileService } from 'src/app/services/profile.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  homeIcon=faHome;
  rssIcon = faRss;
  gearIcon = faGear;
  userIcon = faUser;
  envelopeIcon = faEnvelope;
  arrowIcon = faArrowRightArrowLeft;
  registerIcon = faUserPlus;
  loginIcon = faRightToBracket;
  currentSelectedButton:number=1;
  userModel:UserModel;
  profile:Profile;
  imageUrL = "https://localhost:7144/Uploads/images/";
  constructor(
    private authService:AuthService,
    private router:Router,
    private localStorage:LocalStorageService,
    private profileService:ProfileService,
    private roleService:RoleService) {
    
  }

  ngOnInit(): void {
    if(!this.loggedIn() && this.isAuthenticated())
    {
      this.getUserModel();
      this.getUserProfile();
    }
   
  }



  isAuthenticated()
  {
    if(this.authService.isAuthenticated())
    {
      
      return true;
    }
    return false;
  }

 
  getUserModel(){
    this.userModel = this.authService.getUserInfo();
  }

  getUserProfile()
  {
    this.profileService.getUserProfile(this.userModel.id).subscribe(response=>{
      this.profile = response.data;
    },responseError=>{
      console.log(responseError);
    })
  }

  login()
  {
    this.currentSelectedButton =1;
    this.router.navigate(["/auth/login"]);
  }

  register()
  {
    this.currentSelectedButton = 2;
    this.router.navigate(["/auth/register"]);
  }

  logout()
  {
    this.localStorage.remove('token');
    this.router.navigate(["/auth/login"]);
  }

  loggedIn()
  {
    if(this.authService.loggedIn())
    {
      this.localStorage.remove('token');
      return true;
    }
    else{
      
      return false;
    }
  }

  getCurrentSelectedButton(selectedButton:number)
  {

    if(this.currentSelectedButton == selectedButton)
    {
      return "btn btn-secondary login-register-button buttonActive"
    }
    else{

      return "btn btn-secondary login-register-button"
    }
    
  }


  getUserImage()
  {
    if(this.profile.profileImage == null)
    {
      return this.imageUrL + 'DefaultProfileImage.jpg';
    }
    return this.imageUrL + this.profile.profileImage;
  }
  
  checkUserRoleForAdmin()
  {
    if(this.authService.getUserInfo().roles != undefined)
    {
      return this.roleService.checkRolesForAdmin(this.authService.getUserInfo().roles)
    }
    return false;
  }

  checkRolesForJournalist()
  {
    if(this.authService.getUserInfo().roles != undefined)
    {
      return this.roleService.checkRolesForJournalist(this.authService.getUserInfo().roles)
    }
    return false;
  }
}
