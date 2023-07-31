import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component'
import { RegisterComponent } from './authentication/register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListingComponent } from './user-listing/user-listing.component';
import { AuthGuard } from 'src/app/gards/auth.guard';
import { ConsultantComponent } from './consultant/consultant.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { CalendarComponent } from './Components/calendar/calendar.component';
import { EmployeeTypeComponent } from 'src/app/Components/employee-type/employee-type.component';
import { AddEmployeeTypeComponent } from 'src/app/Components/employee-type/add-employee-type/add-employee-type.component';
import { EditEmployeeTypeComponent } from 'src/app/Components/employee-type/edit-employee-type/edit-employee-type.component';
import { EmployeeComponent } from './Components/employee/employee.component';
import { ConfigurationComponent } from 'src/app/Components/configuration/configuration.component';
import { AddEmployeeComponent } from 'src/app/Components/employee/add-employee/add-employee.component';
import { EditEmployeeComponent } from 'src/app/Components/calendar/edit-employee/edit-employee.component';
import { AddCalendarComponent } from './Components/calendar/add-calendar/add-calendar.component';
import { EditCalendarComponent } from './Components/calendar/edit-calendar/edit-calendar.component';
import { ResetComponent } from './authentication/reset/reset.component';
import { ClientComponent } from './Components/client/client.component';
import { AddClientComponent } from './Components/client/add-client/add-client.component';
import { EmailUserComponent } from './Components/email-user/email-user.component';
import { GHelpComponent } from './Components/g-help/g-help.component';
import { AddHelpComponent } from './Components/g-help/add-help/add-help.component';
import { EditHelpComponent } from './Components/g-help/edit-help/edit-help.component';
import { HelpTypeComponent } from './Components/help-type/help-type.component';
import { AddHelpTypeComponent } from './Components/help-type/add-help-type/add-help-type.component';
import { EditHelpTypeComponent } from './Components/help-type/edit-help-type/edit-help-type.component';
import { UserHelpComponent } from './Components/user-help/user-help.component';
import { ResourceComponent } from './Components/resource/resourceview/resource.component';
import { ResourceTypeComponent } from './Components/resource/resource-type/resource-type.component';
import { AddResourceTypeComponent } from './Components/resource/resource-type/add-resource-type/add-resource-type.component';
import { EditResourceTypeComponent } from './Components/resource/resource-type/edit-resource-type/edit-resource-type.component';
import { RolesComponent } from './Components/roles/roles.component';
import { AddRolesComponent } from './Components/roles/add-roles/add-roles.component';
import { EditRoleComponent } from './Components/roles/edit-role/edit-role.component';
import { TasksComponent } from './Components/tasks/tasks.component';
import { AddTaskComponent } from './Components/tasks/add-task/add-task.component';
import { EditTaskComponent } from './Components/tasks/edit-task/edit-task.component';
import { TimesheetetComponent } from './timesheetet/timesheetet.component';
import { ViewemployeeComponent } from './Components/employee/view-employee/view-employee.component';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  { path: 'reset-password', component: ResetPasswordComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'user-details', component: UserDetailsComponent },
  { path: 'user-listing', component: UserListingComponent },
  { path: 'consultant', component: ConsultantComponent },
  { path : 'calendar', component: CalendarComponent },
  { path : 'employee-types', component:EmployeeTypeComponent},
  {path : 'addemployeetype', component:AddEmployeeTypeComponent},
  {path : 'editemployeetype/:id', component:EditEmployeeTypeComponent},
  {path : 'employees', component:EmployeeComponent},
  {path : 'employee/:employeeId', component:ViewemployeeComponent },
  {path : 'config', component:ConfigurationComponent},
  {path : 'addemployee', component : AddEmployeeComponent},
  {path : 'editeemployee/:employeeId', component:EditEmployeeComponent},
  {path : 'addcalendaritem', component : AddCalendarComponent},
  {path : 'editcalendaritem/:calendarItemId', component : EditCalendarComponent},
  {path: 'reset', component: ResetComponent},
{path: 'client', component: ClientComponent},
{path: 'emailuser', component: EmailUserComponent},
{path: 'addclient', component:AddClientComponent},
{path: 'addhelp', component:AddHelpComponent},
{path:'help',component:GHelpComponent},
{path: 'edithelp',component:EditHelpComponent},
{path:'helptype', component: HelpTypeComponent},
{path:'addhelptype',component: AddHelpTypeComponent},
{path:'edithelptype',component:EditHelpTypeComponent},
{path:'user-help',component: UserHelpComponent},
{path:'resource', component:ResourceComponent},
{path: 'resourcetype',component:ResourceTypeComponent},
{path:'addresourcetype',component:AddResourceTypeComponent},
{path:'editresourcetype',component:EditResourceTypeComponent},
{path:'roles',component:RolesComponent},
{path:'add-role',component:AddRolesComponent},
{path:'edit-role',component:EditRoleComponent},
{path:'task', component:TasksComponent},
{path:'add-task', component:AddTaskComponent},
{path: 'add-task', component:EditTaskComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard] },
  {path: 'timecard', component: TimesheetetComponent},
  {path: '', redirectTo: '/login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
