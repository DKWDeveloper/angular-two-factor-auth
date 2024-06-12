import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserchatComponent } from './user/userchat/userchat.component';
import { DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService, DragAndDropService, ResizeService } from '@syncfusion/ej2-angular-schedule';



@NgModule({
  declarations: [
    AppComponent,
    // UserchatComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CoreModule,
    BrowserAnimationsModule,
   
  ],
  providers: [DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService, DragAndDropService, ResizeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
