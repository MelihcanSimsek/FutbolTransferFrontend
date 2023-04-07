import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr'
import { LoginModel } from 'src/app/models/auth/loginModel';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private authService:AuthService,
    private localStorage:LocalStorageService,
    private router:Router) {
    
  }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm()
  {
    this.loginForm = this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  login()
  {
    if(this.loginForm.valid)
    {
      let loginModel:LoginModel = Object.assign({},this.loginForm.value);
      this.authService.login(loginModel).subscribe(response=>{
        this.localStorage.setItem('token',response.data.token);
        this.toastrService.info("Anasayfaya yönlendiriliyorsunuz","Giriş Başarılı");
        this.router.navigate(["/home"])
      },responseError=>{

        this.toastrService.error("Kullanıcı bilgileri hatalı","Giriş Başarısız");
        this.router.navigate(["/login"]);
      })
    }
    else{
      this.toastrService.info("Giriş bilgileri eksik lütfen doldurun","Bilgiler eksik");
    }
  }
}
