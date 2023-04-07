import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {HttpClientModule} from '@angular/common/http'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { JwtHelperService,JWT_OPTIONS } from '@auth0/angular-jwt';
import { HomeComponent } from './components/home/home.component';
import { NaviComponent } from './components/navi/navi.component';
import { ContentComponent } from './components/content/content.component';
import { TransferContentComponent } from './components/transfer-content/transfer-content.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NaviComponent,
    ContentComponent,
    TransferContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [
    {provide:JWT_OPTIONS,useValue:JWT_OPTIONS},
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
