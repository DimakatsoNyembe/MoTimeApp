import { Component, OnInit } from '@angular/core';
import { ResourceService } from 'src/app/services/resource-service.service';
import { ResourceViewModel } from 'src/app/shared/resource2';
import { ResourceTypeService } from 'src/app/services/resource-type.service';
import { ResourceTypeViewModel } from 'src/app/shared/resourceType';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Observable, catchError, combineLatest, map, of } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {
  resources: ResourceViewModel[] = [];
  resourceTypes: ResourceTypeViewModel[] = [];
  searchName: string = '';
  filtered : ResourceViewModel[]=[];


  constructor(
    private resourceService: ResourceService,
    private resourceTypeService: ResourceTypeService,
    private router: Router,
    private toast: NgToastService
  ) {}


  ngOnInit(): void {
    // Fetch both resources and resource types using combineLatest
    combineLatest([this.getAllResources(), this.getAllResourceTypes()]).subscribe(
      ([resources, resourceTypes]) => {
        console.log('Resources:', resources);
        console.log('ResourceTypes:', resourceTypes);
        this.resources = resources.map(resource => ({
          ...resource,
          resourceTypeName: this.getResourceTypeName(resource.resourceTypeId, resourceTypes)
        }));
      }
    );
  }

  search(): void {
    if (!this.searchName) {
      this.toast.error({ detail: 'Error Message', summary: 'Please enter a search term.', duration: 5000 });
      return;
    }
 
    this.filtered = this.resources.filter((resource) =>
    resource.resourceName && resource.resourceName.toLowerCase().includes(this.searchName.toLowerCase())


    );


  }

  // Get all resources
  getAllResources(): Observable<ResourceViewModel[]> {
    return this.resourceService.GetAllResources();
  }


  // Get all resource types
  getAllResourceTypes(): Observable<ResourceTypeViewModel[]> {
    return this.resourceTypeService.GetAllResourceTypes().pipe(
      catchError(() => of([])) // Return an empty array in case of an error.
    );
  }


  // Get resource type name by ID
  getResourceTypeName(resourceTypeId: number, resourceTypes: ResourceTypeViewModel[]): string {
    const foundType = resourceTypes.find(type => type.resourceTypeId === resourceTypeId);
    return foundType ? foundType.resourceTypeName : 'Unknown';
  }


  // Delete resource
  DeleteResource(resourceId: number): void {
    this.resourceService.deleteResource(resourceId).subscribe(() => {
      window.location.reload();
    });
  }


  // Edit resource
  editResource(resourceId: number): void {
    localStorage.setItem('resourceId', resourceId.toString());
    this.router.navigate(['/edit-resource']);
  }
}
