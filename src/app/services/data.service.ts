import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, Subject, throwError } from 'rxjs';
import { Employeetype } from 'src/app/shared/employeetype';
import { NgToastService } from 'ng-angular-popup';
import { CalendarItem } from '../shared/calendaritem';
import { Eemployee } from '../shared/eemployee';
import { AddCalendarItem } from '../shared/addCalendarItem';
import { Employee2 } from '../shared/employee2';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  [x: string]: any;




  apiUrl = 'https://localhost:7153/api/';




  httpOptions ={
    headers: new HttpHeaders({
      // ContentType: 'application/json'
      'Content-Type': 'application/json'
    })
  }




  constructor(private httpClient: HttpClient,private toast: NgToastService ) {
  }




  // employeetype
  getEmployeetype(employeeTypeId: number) {
    return this.httpClient.get(`${this.apiUrl}MoTime/GetEmployeeType` + "/" + employeeTypeId)
    .pipe(map(result => result))
  }




  getEmployeeTypes(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}MoTime/GetAllEmployeeTypes`)
    .pipe(map(result => result))
  }


  addEmployeeType(employeeType: Employeetype): Observable<Employeetype> {
    return this.httpClient.post<Employeetype>(`${this.apiUrl}MoTime/AddEmployeeType`, employeeType, this.httpOptions);
  }


  editEmployeeType(employeeTypeId: number, type: Employeetype) {
    return this.httpClient.put(`${this.apiUrl}MoTime/EditEmployeeType/${employeeTypeId}`, type, this.httpOptions);
  }


 
  deleteEmployeeType(employeeTypeId: Number)
  {
   
    return this.httpClient.delete<string>(`${this.apiUrl}MoTime/DeleteEmployeeType` + "/" +employeeTypeId, this.httpOptions)
  }


 // employees
  getEmployees(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}MoTime/GetAllEmployees`)
    .pipe(map(result => result))
  }


  getEmployee(employeeId: number): Observable<Eemployee> {
    return this.httpClient.get<Eemployee>(`${this.apiUrl}MoTime/GetEmployee/${employeeId}`);
  }




  addEmployee(eemployee: Eemployee): Observable<Eemployee> {
    return this.httpClient.post<Eemployee>(`${this.apiUrl}MoTime/AddEmployee`, eemployee, this.httpOptions);
  }


  editEmployee(employeeId: number, eemployee : Employee2) {
    return this.httpClient.put(`${this.apiUrl}MoTime/EditEmployee/${employeeId}`, eemployee, this.httpOptions);
  }




  deleteEmployee(employeeId: Number)
  {
    return this.httpClient.delete<string>(`${this.apiUrl}MoTime/DeleteEmployee` + "/" +employeeId, this.httpOptions)
  }


  // calendar items
 
  getCalendarItem(calendarId: number): Observable<CalendarItem> {
    return this.httpClient.get<CalendarItem>(`${this.apiUrl}MoTime/GetCalendar/${calendarId}`);
  }


  addCalendarItem(calendarItem: CalendarItem): Observable<CalendarItem> {
    return this.httpClient.post<CalendarItem>(`${this.apiUrl}MoTime/AddCalendar`, calendarItem, this.httpOptions);
  }




  editCalendarItem(calendarId: number,calendarItem : AddCalendarItem) {
    return this.httpClient.put(`${this.apiUrl}MoTime/EditCalendar/${calendarId}`, calendarItem, this.httpOptions);
  }


  deleteCalendarItem(calendarId: Number)
  {
    this.toast.success({detail:'Delete Message',summary:'Successfully deleted calendar item.', duration:5000});
    return this.httpClient.delete<string>(`${this.apiUrl}MoTime/DeleteCalendar` + "/" + calendarId, this.httpOptions)
  }


  // users
  getUsers(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}MoTime/GetAllUsers`)
    .pipe(map(result => result))
  }




  // employee status
  getEmployeeStatuses(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}MoTime/GetAllEmployeeStatuses`)
    .pipe(map(result => result))
  }


  // regions
  getRegions(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}MoTime/GetAllRegions`)
    .pipe(map(result => result))
  }


  // divisions
  getDivisions(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}MoTime/GetAllDivisions`)
    .pipe(map(result => result))
  }


  // manager types
  getManagerTypes(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}MoTime/GetAllManagerTypes`)
    .pipe(map(result => result))
  }


  // resources
  getResources(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}MoTime/GetAllResource`)
    .pipe(map(result => result))
  }


  //  // calendars
   getCalendars(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}MoTime/GetAllCalendars`)
    .pipe(map(result => result))
  }


   // calendars
   getTitles(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}MoTime/GetAllTitles`)
    .pipe(map(result => result))
  }


}
