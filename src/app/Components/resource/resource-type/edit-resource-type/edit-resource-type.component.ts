import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResourceTypeService } from 'src/app/services/resource-type.service';
import { ResourceTypeViewModel } from 'src/app/shared/resourceType';


@Component({
  selector: 'app-edit-resource-type',
  templateUrl: './edit-resource-type.component.html',
  styleUrls: ['./edit-resource-type.component.css'],
})
export class EditResourceTypeComponent implements OnInit {
  resourceType: ResourceTypeViewModel | undefined;
  resourceTypeId: number | undefined;
  resourceTypeName: string = '';
  resourceTypeDescription: string = '';


  constructor(
    private resourceTypeService: ResourceTypeService,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.resourceTypeId = parseInt(localStorage.getItem('resourceTypeId')!, 10);
    if (!isNaN(this.resourceTypeId)) {
      this.loadResourceType();
    }
  }


  loadResourceType(): void {
    this.resourceTypeService.getResourceTypeById(this.resourceTypeId!).subscribe((result) => {
      this.resourceType = result;
      this.populateForm();
    });
  }


  populateForm(): void {
    if (this.resourceType) {
      this.resourceTypeName = this.resourceType.resourceTypeName || '';
      this.resourceTypeDescription = this.resourceType.resourceTypeDescription || '';
    }
  }


  cancel(): void {
    localStorage.removeItem('resourceTypeId');
    this.router.navigate(['/resource-type']);
  }


  onSubmit(): void {
    if (this.resourceType && this.resourceTypeId) {
      const updatedResourceType: ResourceTypeViewModel = {
        resourceTypeId: this.resourceTypeId,
        resourceTypeName: this.resourceTypeName || '',
        resourceTypeDescription: this.resourceTypeDescription || '',
      };


      this.resourceTypeService.editResourceType(updatedResourceType.resourceTypeId, updatedResourceType).subscribe((result) => {
        localStorage.removeItem('resourceTypeId');
        this.router.navigate(['/resource-type']);
      });
    }
  }
}
