import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ResourceTypeService } from 'src/app/services/resource-type.service';
import { ResourceTypeViewModel } from 'src/app/shared/resourceType';


@Component({
  selector: 'app-add-resource-type',
  templateUrl: './add-resource-type.component.html',
  styleUrls: ['./add-resource-type.component.css'],
})
export class AddResourceTypeComponent implements OnInit{


  ResourcetypeForm = new FormGroup(
    {
      ResourceTypeName: new FormControl(''),
      ResourceTypeDescription:  new FormControl('')


    })
    constructor( private router: Router,private resourcetypeservice: ResourceTypeService){}
   
  ngOnInit(): void {
  }
  cancel(){
    this.router.navigate(['/resource-type'])
  }


  onSubmit() {
    const ResourceTypeName: string = this.ResourcetypeForm.get('ResourceTypeName')?.value || '';
    const ResourceTypeDescription: string = this.ResourcetypeForm.get('ResourceTypeDescription')?.value || '';
 
    const resourceType: ResourceTypeViewModel = {
      resourceTypeId: 0, // Assuming you set the appropriate value on the server-side
      resourceTypeName: ResourceTypeName,
      resourceTypeDescription: ResourceTypeDescription
    };
 
    this.resourcetypeservice.addResourceType(resourceType).subscribe(result => {
      this.router.navigate(['/resource-type']);
    });
  }
 
}
