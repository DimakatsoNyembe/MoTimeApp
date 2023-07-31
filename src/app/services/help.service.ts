import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Help } from 'src/app/shared/help';


@Injectable({
  providedIn: 'root'
})
export class HelpService {
  apiUrl = 'https://localhost:7153/api/';


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private httpClient: HttpClient) { }


// Get all helps
GetAllHelp(): Observable<Help[]> {
  return this.httpClient.get<Help[]>(`${this.apiUrl}MoTime/GetAllHelp`);
}


  // Get help by id
  GetHelp(helpId: number): Observable<Help> {
    return this.httpClient.get<Help>(`${this.apiUrl}MoTime/GetHelp/${helpId}`);
  }
 
  // Add help


  AddHelp(help: FormData): Observable<Help> {
    return this.httpClient.post<Help>(`${this.apiUrl}MoTime/AddHelp`, help);
  }
  //edit help
 
  EditHelp(helpId: number, help: FormData): Observable<Help> {
    return this.httpClient.put<Help>(`${this.apiUrl}MoTime/EditHelp/${helpId}`, help);
  }


 
  // Delete help
  DeleteHelp(helpId: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}MoTime/DeleteHelp/${helpId}`);
  }
 


//download
DownloadHelp(id: number): Observable<any> {
  return this.httpClient.get(`${this.apiUrl}MoTime/DownloadHelp/${id}`, { responseType: 'arraybuffer' });
}
}
