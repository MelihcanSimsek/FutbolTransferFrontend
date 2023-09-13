import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { ReporterComponent } from './components/reporter/reporter.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { ApplyComponent } from './components/apply/apply.component';
import { RequestComponent } from './components/request/request.component';
import { SettingsComponent } from './components/settings/settings.component';

const routes: Routes = [
  {path:"auth/login",component:LoginComponent},
  {path:"auth/register",component:RegisterComponent},
  {path:"home",component:HomeComponent},
  {path:"profile/:userId",component:ProfileComponent},
  {path:":userId/status/:postId",component:MainComponent},
  {path:"reporters",component:ReporterComponent},
  {path:"transfers",component:TransferComponent},
  {path:"apply",component:ApplyComponent},
  {path:"request",component:RequestComponent},
  {path:"settings",component:SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
