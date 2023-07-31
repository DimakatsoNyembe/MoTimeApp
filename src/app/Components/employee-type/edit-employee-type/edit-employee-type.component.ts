import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Employeetype } from 'src/app/shared/employeetype';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-edit-employee-type',
  templateUrl: './edit-employee-type.component.html',
  styleUrls: ['./edit-employee-type.component.css']
})
export class EditEmployeeTypeComponent implements OnInit {
  employeetypeForm = new FormGroup({
    employeeTypeName: new FormControl('', Validators.required),
    employeeTypeDescription: new FormControl('', Validators.required)
  });


  employeetype: Employeetype | null = null;
  existingEmployeeTypeNames: string[] = [];
  originalEmployeeTypeName: string | null = null;
  originalEmployeeTypeDescription: string | null = null;
  changesMade = false;


  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: NgToastService
  ) {}


  ngOnInit(): void {
    this.getExistingEmployeeTypeNames();
    this. getExistingBoth();


    this.dataService
      .getEmployeetype(+this.route.snapshot.params['id'])
      .subscribe((result) => {
        this.employeetype = result as Employeetype;
        if (this.employeetype) {
          this.employeetypeForm.patchValue({
            employeeTypeName: this.employeetype.employeeTypeName || '',
            employeeTypeDescription: this.employeetype.employeeTypeDescription || ''
          });
        }
      });
  }


  getExistingEmployeeTypeNames() {
    this.dataService.getEmployeeTypes().subscribe((employeeTypes: Employeetype[]) => {
      this.existingEmployeeTypeNames = employeeTypes
        .map((type) => type.employeeTypeName)
        .filter((name) => !!name);
    });
  }


  getExistingBoth() {
    this.dataService.getEmployeeTypes().subscribe((employeeTypes: Employeetype[]) => {
      this.existingEmployeeTypeNames = employeeTypes
        .map((type) => type.employeeTypeName)
        .filter((name) => !!name);
    });


    const id = +this.route.snapshot.params['id'];
    this.dataService.getEmployeetype(id).subscribe((result) => {
      this.employeetype = result as Employeetype;
      if (this.employeetype) {
        this.originalEmployeeTypeName = this.employeetype.employeeTypeName;
        this.originalEmployeeTypeDescription = this.employeetype.employeeTypeDescription;
        this.employeetypeForm.patchValue({
          employeeTypeName: this.employeetype.employeeTypeName || '',
          employeeTypeDescription: this.employeetype.employeeTypeDescription || ''
        });
      }
    });
  }


  cancel() {
    this.router.navigate(['/types']);
  }


  onSubmit() {
    if (this.employeetype) {
      const updatedEmployeeType: Employeetype = {
        employeeTypeId: this.employeetype.employeeTypeId,
        employeeTypeName: this.employeetypeForm.value.employeeTypeName || '',
        employeeTypeDescription: this.employeetypeForm.value.employeeTypeDescription || ''
      };


      const updatedEmployeeTypeName: string = this.employeetypeForm.value.employeeTypeName || '';
      const updatedEmployeeTypeDescription: string = this.employeetypeForm.value.employeeTypeDescription || '';
   
      if (
        updatedEmployeeTypeName === this.originalEmployeeTypeName &&
        updatedEmployeeTypeDescription === this.originalEmployeeTypeDescription
      ) {
        // No changes were made, show alert error
       
        this.toast.error({ detail: 'Error Message', summary: 'No changes were made to the employee type.', duration: 5000 });
        return;
      }
      // Check if the updated employee type name already exists
      if (
        updatedEmployeeType.employeeTypeName !== '' &&
        this.existingEmployeeTypeNames.includes(updatedEmployeeType.employeeTypeName)
      ) {
        this.toast.error({ detail: 'Error Message', summary: 'Employee type name already exists. Please enter a unique name.', duration: 5000 });
        // Display an error message to the user
     
        return;
      }


      this.dataService.editEmployeeType(updatedEmployeeType.employeeTypeId, updatedEmployeeType).subscribe(
        () => {
          if (this.employeetype) {
            this.employeetype.employeeTypeName = updatedEmployeeType.employeeTypeName;
            this.employeetype.employeeTypeDescription = updatedEmployeeType.employeeTypeDescription;
          }
          this.toast.success({ detail: 'Success Message', summary: 'Employee type successfully updated.', duration: 5000 });
          this.router.navigate(['/types']);
        },
        (error) => {
          this.toast.error({ detail: 'Error Message', summary: 'Failed to update Employee type.', duration: 5000 });
       
        }
      );
    }
  }
}
