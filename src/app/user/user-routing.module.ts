import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTestmonyComponent } from './user-testmony/create-testmony/create-testmony.component';
import { ListTestmonyComponent } from './user-testmony/list-testmony/list-testmony.component';
import { UserchatComponent } from './userchat/userchat.component';
import { CalenderComponent } from './calender/calender.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  { path: 'addTestmony', component: CreateTestmonyComponent },
  { path: 'updateTestmony/:id', component: CreateTestmonyComponent },
  { path: 'listTestmony', component: ListTestmonyComponent },
  { path: 'userChat', component: UserchatComponent },
  { path: 'calender', component: CalenderComponent },
  { path: 'payment', component: PaymentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
