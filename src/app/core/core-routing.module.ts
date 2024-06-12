import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from '../shared/layout-component/main/main.component';
import { VerifyOTPComponent } from './forgotPassword/verify-otp/verify-otp.component';
import { ResetPasswordComponent } from './forgotPassword/reset-password/reset-password.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound/pagenotfound.component';
import { UserLoginComponent } from './user-login/user-login.component';

const routes: Routes = [
  { path: '', 'redirectTo': '/main/login', 'pathMatch': 'full' },
  { path: 'main/login', component: UserLoginComponent },
  { path: 'verifyOTP/:userId', component: VerifyOTPComponent },
  { path: 'resetPassword/:userId', component: ResetPasswordComponent },

  {
    path: 'home', component: MainComponent, children: [
      // { path: '', component: ProfileComponent },
      { path: 'user', loadChildren: async () => (await import('../user/user.module')).UserModule },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
