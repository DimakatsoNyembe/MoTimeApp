import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DayPilot } from 'daypilot-pro-angular';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Events } from './Event';
import { Project, User } from './Employees';
import { Employee } from '../shared/employee';


@Injectable()
export class DataService {


  constructor(private http: HttpClient) {
  }
  httpOptions = {


    headers: new HttpHeaders({


      'Content-Type': 'application/json'


    })


  };
  getEvents(from: DayPilot.Date, to: DayPilot.Date, employeeId: string): Observable<any[]> {
    const params = new HttpParams()
      .set('from', from.toString())
      .set('to', to.toString())
      .set('employee', employeeId);


    return this.http.get<any[]>("https://localhost:7153/api/Events", { params });
  }


  getEmployees(): Observable<User[]> {
    return this.http.get<User[]>('https://localhost:7153/api/MoTime/GetAllEmployees');
  }

//   getEmployees(): Observable<Employee[]> {
//     return this.http.get<Employee[]>('https://localhost:7153/api/MoTime/GetAllEmployees');
//   }



  getProjects(): Observable<Project[]>{
    return this.http.get<Project[]>('https://localhost:7153/api/MoTime/GetAllProject');
  }


  addEvent(newEvent: Events): Observable<any> {
    console.log(newEvent);
    return this.http.post<Events>('https://localhost:7153/api/Events', newEvent, this.httpOptions);
  }


  updateEvent(id: number, updatedEvent: any): Observable<any> {
    return this.http.put<any>(`https://localhost:7153/api/Events/${id}`, updatedEvent);
  }


  submitTimesheetEvent(id: number, month: number): Observable<void> {
    const body = { id: id, month: month };
    console.log(body);
    return this.http.post<void>(`https://localhost:7153/api/Events/SubmitTimeSheet`, body, this.httpOptions);
  }
  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`https://localhost:7153/api/Events/${id}`);
  }


  getEventById(id: number): Observable<Events> {
    return this.http.get<Events>(`https://localhost:7153/api/Events/${id}`);
  }
}
