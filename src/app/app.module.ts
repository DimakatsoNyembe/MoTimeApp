import { NgModule } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { APIService } from 'src/app/services/api.service';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListingComponent } from './user-listing/user-listing.component';
//import { TokenInterceptor } from 'src/app/interceptor/token.interceptor';
import { ConsultantComponent } from './consultant/consultant.component';
import { NgToastModule } from 'ng-angular-popup';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { EmployeeComponent } from './Components/employee/employee.component';
import { TasksComponent } from './Components/tasks/tasks.component';
import { EmployeeTypeComponent } from './Components/employee-type/employee-type.component';
import { ConfigurationComponent } from './Components/configuration/configuration.component';
import { AddEmployeeComponent } from './Components/employee/add-employee/add-employee.component';
import { AddEmployeeTypeComponent } from './Components/employee-type/add-employee-type/add-employee-type.component';
import { EditEmployeeTypeComponent } from './Components/employee-type/edit-employee-type/edit-employee-type.component';
import { CalendarComponent } from './Components/calendar/calendar.component';
import { AddCalendarComponent } from './Components/calendar/add-calendar/add-calendar.component';
import { EditCalendarComponent } from './Components/calendar/edit-calendar/edit-calendar.component';
import { EditEmployeeComponent } from './Components/edit-employee/edit-employee.component';
import { NotificationComponentComponent } from './Components/notification-component/notification-component.component';
import { GHelpComponent } from './Components/g-help/g-help.component';
import { AddHelpComponent } from './Components/g-help/add-help/add-help.component';
import { EditHelpComponent } from './Components/g-help/edit-help/edit-help.component';
import { HelpTypeComponent } from './Components/help-type/help-type.component';
import { AddHelpTypeComponent } from './Components/help-type/add-help-type/add-help-type.component';
import { EditHelpTypeComponent } from './Components/help-type/edit-help-type/edit-help-type.component';
import { LogItCallComponent } from './Components/log-it-call/log-it-call.component';
import { EmailUserComponent } from './Components/email-user/email-user.component';
import { UserHelpComponent } from './Components/user-help/user-help.component';
import { ProjectComponent } from './Components/project/project.component';
import { ResourceComponent } from './Components/resource/resourceview/resource.component';
import { ResourceTypeComponent } from './Components/resource/resource-type/resource-type.component';
import { AddResourceTypeComponent } from './Components/resource/resource-type/add-resource-type/add-resource-type.component';
import { EditResourceTypeComponent } from './Components/resource/resource-type/edit-resource-type/edit-resource-type.component';
import { RolesComponent } from './Components/roles/roles.component';
import { ClientComponent } from './Components/client/client.component';
import { AddClientComponent } from './Components/client/add-client/add-client.component';
import { ResetComponent } from './authentication/reset/reset.component';
import { InactiveWarningComponent } from './Components/inactive-warning/inactive-warning.component';
import { ChunkPipe } from './Components/chunk.pipe';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { TimesheetetComponent } from './timesheetet/timesheetet.component';
import { DataService } from './timesheetet/data.Service';
import {DayPilotModule} from 'daypilot-pro-angular';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PasswordResetComponent,
    ForgotPasswordComponent,
    UserDetailsComponent,
    DashboardComponent,
    UserListingComponent,
    ConsultantComponent,
    ResetPasswordComponent,
    EmployeeComponent,
    TasksComponent,
    EmployeeTypeComponent,
    ConfigurationComponent,
    AddEmployeeComponent,
    AddEmployeeTypeComponent,
    EditEmployeeTypeComponent,
    CalendarComponent,
    AddCalendarComponent,
    EditCalendarComponent,
    EditEmployeeComponent,
    NotificationComponentComponent,
    HelpTypeComponent,
    LogItCallComponent,
    EmailUserComponent,
    ProjectComponent,
    ResourceComponent,
    ResourceTypeComponent,
    AddResourceTypeComponent,
    EditResourceTypeComponent,
    RolesComponent,
    ClientComponent,
    AddClientComponent,
    ResetComponent,
    InactiveWarningComponent,
    GHelpComponent,
    AddHelpTypeComponent,
    EditHelpComponent,
    AddHelpComponent,
    EditHelpTypeComponent,
    UserHelpComponent, 
    ChunkPipe,
    TimesheetetComponent


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right', // Set the desired position here
      timeOut: 2000,
      enableHtml: true
    }),
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgToastModule,
    CommonModule,
    DayPilotModule
  ],
  providers: [APIService, DatePipe, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
