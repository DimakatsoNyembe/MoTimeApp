import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Employeetype } from 'src/app/shared/employeetype';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-employee-type',
  templateUrl: './employee-type.component.html',
  styleUrls: ['./employee-type.component.css']
})
export class EmployeeTypeComponent implements OnInit {
  types: Employeetype[] = [];
  filtered: Employeetype[] = [];
  searchName: string = '';


  constructor(private dataService: DataService, private router: Router, private toast: NgToastService) {}


  ngOnInit(): void {
    this.getEmployeeTypes();
  }


  getEmployeeTypes() {
    this.dataService.getEmployeeTypes().subscribe((result: Employeetype[]) => {
      this.types = result;
      this.filtered = result;
    });
  }




  deleteEmployeeType(employeeTypeId: Number) {
    this.dataService.deleteEmployeeType(employeeTypeId).subscribe(
      () => {
        this.toast.success({ detail: 'Success Message', summary: 'Employee type deleted successfully', duration: 5000 });
        window.location.reload();
      },
      (error) => {
        // Display an error message if the deletion is not allowed
        if (error && error.message) {
          this.toast.error({ detail: 'Delete employee type', summary: 'Error in deleting employee type, because it is used elsewhere', duration: 5000 });
        } else {
          this.toast.error({ detail: 'An error occurred during deletion.', summary: 'Error', duration: 5000 });
        }
      }
    );}


  search(): void {
    if (!this.searchName) {
      // alert('Please enter a search term.');
      this.toast.error({ detail: 'Error Message', summary: 'Please enter a search term.', duration: 5000 });
      return;
    }
 
    this.filtered = this.types.filter((type) =>
    // type.employeeTypeName.toLowerCase().includes(this.searchName.toLowerCase())
    type.employeeTypeName && type.employeeTypeName.toLowerCase().includes(this.searchName.toLowerCase())


    );


  }
}
