import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { VerifiedRequest } from 'src/app/models/entities/verifiedRequest';
import { ApplyService } from 'src/app/services/apply.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent implements OnInit {

  applyForm:FormGroup;
  request:VerifiedRequest;
  constructor(
    private authService:AuthService,
    private toastrService:ToastrService,
    private applyService:ApplyService,
    private fromBuilder:FormBuilder) {
    
  }



  ngOnInit(): void {
    this.createApplyForm();
    this.checkUserApplied(this.authService.getUserInfo().id);
  }

  checkUserApplied(id:number)
  {
    this.applyService.getRequestByUserId(id).subscribe(response=>{
      this.request = response.data;
    })

  }
  createApplyForm()
  {
    this.applyForm = this.fromBuilder.group({
      applyText:["",Validators.required]
    })
  }

  apply()
  {
    if(this.applyForm.valid)
    {
      let requestItem:VerifiedRequest = Object.assign({
        userId:this.authService.getUserInfo().id,
        message:this.applyForm.value.applyText
      })
      this.applyService.add(requestItem).subscribe(response=>{
        this.request = requestItem;
        this.toastrService.success("Talep gönderildi","Başarılı");
      })
    }
    else
    {
      this.toastrService.info("Lütfen bilgileri giriniz","Form Boş")
    }
  }


}
