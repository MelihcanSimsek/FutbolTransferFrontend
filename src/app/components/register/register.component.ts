import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterModel } from 'src/app/models/auth/registerModel';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private localStorage:LocalStorageService,
    private toastrService:ToastrService,
    private router:Router) {
    
  }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      username:["",Validators.required],
      email:["",Validators.required],
      password:["",Validators.required],
      passwordRepeat:["",Validators.required]
    })
  }

  register(){
    if(this.registerForm.valid)
    {
      if(this.registerForm.value.password == this.registerForm.value.passwordRepeat)
      {
        let registerModel:RegisterModel = Object.assign({
          name:this.registerForm.value.username,
          email:this.registerForm.value.email,
          password:this.registerForm.value.password
        });
        this.authService.register(registerModel).subscribe(response=>{
          this.localStorage.setItem('token',response.data.token);
          setTimeout(() => {
            location.reload();
          
          }, 1);
          this.toastrService.success("Anasayfaya yönlendiriliyorsunuz.","Kayıt Başarılı");
          this.router.navigate(["/home"]);
        },responseError=>{

          this.toastrService.info(responseError.error);
        })
      }
      else
      {
        this.toastrService.warning("Girilen şifreler eşleşmiyor","Parola tekrar hatası");
      }
    }
    else{
      this.toastrService.info("Kayıt bilgileri eksik lütfen doldurun","Bilgiler eksik");
    }
  }
}
