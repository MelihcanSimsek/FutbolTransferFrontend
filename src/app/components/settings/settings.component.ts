import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserForUpdate } from 'src/app/models/auth/userForUpdate';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit{
  passwordForm:FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private localStorageService:LocalStorageService) {
    
  }

  ngOnInit(): void {
    this.creatPasswordForm();
  }

  creatPasswordForm()
  {
    this.passwordForm = this.formBuilder.group({
      oldPassword:["",Validators.required],
      newPassword:["",Validators.required],
      repeatPassword:["",Validators.required]
    })
  }

  update()
  {
    if(this.passwordForm.valid)
    {
      if(this.passwordForm.value.newPassword == this.passwordForm.value.repeatPassword)
      {
        let userForUpdate:UserForUpdate = Object.assign({
          id:this.authService.getUserInfo().id,
          oldPassword:this.passwordForm.value.oldPassword,
          newPassword:this.passwordForm.value.newPassword
        })
        this.authService.updatePassword(userForUpdate).subscribe(response=>{
          this.passwordForm = new FormGroup({
            repeatPassword:new FormControl("",Validators.required),
            oldPassword:new FormControl("",Validators.required),
            newPassword:new FormControl("",Validators.required)
          })
          this.localStorageService.setItem('token',response.data.token);
          this.toastrService.success("Parola güncellendi","Başarılı");

          
        },responseError=>{
          this.toastrService.error("Mevcut parola hatalı","Parola Hatalı");
        })
      }
      else{
        this.toastrService.error("Parola tekrarı eşleşmiyor","Parola Hatası");
      }
    }
    else{
      this.toastrService.info("Lütfen bilgileri doldurun","Form Boş");
    }
  }
}
