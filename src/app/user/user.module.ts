import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateTestmonyComponent } from './user-testmony/create-testmony/create-testmony.component';
import { ListTestmonyComponent } from './user-testmony/list-testmony/list-testmony.component';
import { UserchatComponent } from './userchat/userchat.component';
import { CalenderComponent } from './calender/calender.component';
import { ScheduleModule, RecurrenceEditorModule } from '@syncfusion/ej2-angular-schedule';
import { PaymentComponent } from './payment/payment.component';



@NgModule({
  declarations: [
    CreateTestmonyComponent,
    ListTestmonyComponent,
    UserchatComponent,
    CalenderComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ScheduleModule, RecurrenceEditorModule,
  ]
})
export class UserModule { }
