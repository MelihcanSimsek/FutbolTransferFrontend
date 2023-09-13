import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {HttpClientModule} from '@angular/common/http'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { JwtHelperService,JWT_OPTIONS } from '@auth0/angular-jwt';
import { HomeComponent } from './components/home/home.component';
import { NaviComponent } from './components/navi/navi.component';
import { ContentComponent } from './components/content/content.component';
import { TransferContentComponent } from './components/transfer-content/transfer-content.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { MainComponent } from './components/main/main.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PostContentPipe } from './pipes/post-content.pipe';
import { PostComponent } from './components/post/post.component';
import { ReporterComponent } from './components/reporter/reporter.component';
import { PlayerFilterPipe } from './pipes/player-filter.pipe';
import { ClubFilterPipe } from './pipes/club-filter.pipe';
import { TransferComponent } from './components/transfer/transfer.component';
import { ProfileContentComponent } from './components/profile-content/profile-content.component';
import { ApplyComponent } from './components/apply/apply.component';
import { RequestComponent } from './components/request/request.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PotentialPipe } from './pipes/potential.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NaviComponent,
    ContentComponent,
    TransferContentComponent,
    MainContentComponent,
    MainComponent,
    ProfileComponent,
    PostContentPipe,
    PostComponent,
    ReporterComponent,
    PlayerFilterPipe,
    ClubFilterPipe,
    TransferComponent,
    ProfileContentComponent,
    ApplyComponent,
    RequestComponent,
    SettingsComponent,
    PotentialPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center',
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
