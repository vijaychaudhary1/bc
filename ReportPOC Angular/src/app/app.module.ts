import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import {TableModule} from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';

import { AppComponent } from './app.component';
import { InvestorReportComponent } from './investor-report/investor-report.component';
import { HttpClientModule } from '@angular/common/http';
import { ExcelService } from './excel.service';


@NgModule({
  declarations: [
    AppComponent,
    InvestorReportComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TableModule,
    CalendarModule,
    DropdownModule,
    ButtonModule
  ],
  providers: [ExcelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
