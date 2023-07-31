import { Component, OnInit } from '@angular/core';
import { ResourceTypeService } from 'src/app/services/resource-type.service';
import { ResourceTypeViewModel } from 'src/app/shared/resourceType';
import { Router } from '@angular/router';


@Component({
  selector: 'app-resource-type',
  templateUrl: './resource-type.component.html',
  styleUrls: ['./resource-type.component.css']
})
export class ResourceTypeComponent implements OnInit {
  resourceTypes: ResourceTypeViewModel[] = [];


  constructor(private resourceTypeService: ResourceTypeService, private router: Router) {}


  ngOnInit(): void {
    this.getAllResourceTypes();
  }


  //Get all resource type
  getAllResourceTypes(): void {
    this.resourceTypeService.GetAllResourceTypes().subscribe(result => {
      this.resourceTypes = result;
    });
  }


  //Delete resource type
  DeleteResourceType(resourceTypeId: number): void {
    this.resourceTypeService.deleteResourceType(resourceTypeId).subscribe(() => {
      window.location.reload();
    });
  }


  editResourceType(resourceTypeId: number): void {
    localStorage.setItem('resourceTypeId', resourceTypeId.toString());
    this.router.navigate(['/editresourcetype']);
  }
 
 
}
