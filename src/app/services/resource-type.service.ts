import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResourceTypeViewModel } from 'src/app/shared/resourceType';


@Injectable({
  providedIn: 'root'
})
export class ResourceTypeService {
  private apiUrl = 'https://localhost:7153/api/'; // Replace this with your API endpoint


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };




  constructor(private httpClient: HttpClient) { }
//Get all resource types
  GetAllResourceTypes(): Observable<ResourceTypeViewModel[]> {
    return this.httpClient.get<ResourceTypeViewModel[]>(`${this.apiUrl}MoTime/GetAllResourceType`);
  }
//Get resource type by id
  getResourceTypeById(resourceTypeId: number): Observable<ResourceTypeViewModel> {
    return this.httpClient.get<ResourceTypeViewModel>(`${this.apiUrl}MoTime/GetResourceTypeById/${resourceTypeId}`);
  }


//Add Resource
  addResourceType(resourceType: ResourceTypeViewModel): Observable<ResourceTypeViewModel> {
    return this.httpClient.post<ResourceTypeViewModel>(`${this.apiUrl}MoTime/AddResourceType`, resourceType, this.httpOptions);
  }
//Edit Resource
  editResourceType(resourceTypeId: number, resourceType: ResourceTypeViewModel): Observable<ResourceTypeViewModel> {
    return this.httpClient.put<ResourceTypeViewModel>(`${this.apiUrl}MoTimeEditResourceType/${resourceTypeId}`, resourceType, this.httpOptions);
  }
//Delete resource
  deleteResourceType(resourceTypeId: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}MoTime/DeleteResourceType/${resourceTypeId}`, this.httpOptions);
  }
}
