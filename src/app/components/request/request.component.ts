import { Component, OnInit } from '@angular/core';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { RequestDto } from 'src/app/models/dtos/requestDto';
import { UserOperationClaim } from 'src/app/models/entities/userOperationClaim';
import { VerifiedRequest } from 'src/app/models/entities/verifiedRequest';
import { ApplyService } from 'src/app/services/apply.service';
import { AuthService } from 'src/app/services/auth.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  checkIcon = faCheck;
  xmarkIcon = faXmark;
  imageUrL = "https://localhost:7144/Uploads/images/";
  requests:RequestDto[]=[];
  constructor(
    private authService:AuthService,
    private applyService:ApplyService,
    private roleService:RoleService,
    private toastrService:ToastrService) {
    
  }

  ngOnInit(): void {
    this.getRequests();
  }

  getRequests()
  {
    this.applyService.getAll().subscribe(response=>{
      this.requests = response.data;
    })
  }

  getUserImage(image:string):string
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

  confirm(request:RequestDto)
  {
    let verifiedRequest:VerifiedRequest = Object.assign({
      id:request.id,
      userId:request.userId,
      message:request.message
    })
    let userOperationClaim:UserOperationClaim = Object.assign({
      userId:request.userId,
      operationClaimId:2
    });
    this.roleService.add(userOperationClaim).subscribe(response=>{
      this.applyService.delete(verifiedRequest).subscribe(newResponse=>{
        this.toastrService.success(request.username +" muhabir olarak eklendi","Muhabir Eklendi");
        this.requests.splice(this.requests.indexOf(request),1);
      })
    })
  }

  reject(request:RequestDto)
  {
    let verifiedRequest:VerifiedRequest = Object.assign({
      id:request.id,
      userId:request.userId,
      message:request.message
    })
    this.applyService.delete(verifiedRequest).subscribe(response=>{
      this.toastrService.info(request.username +" talebi reddedildi","Taleb Reddedildi");
      this.requests.splice(this.requests.indexOf(request),1);
    })
  }
}
