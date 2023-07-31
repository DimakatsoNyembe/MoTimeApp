import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Employee } from 'src/app/shared/employee';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  filtered: Employee[] = [];
  searchName: string = '';
  employeeId! : number;


  constructor(private dataService: DataService, private router: Router, private toast: NgToastService) {}


  ngOnInit(): void {
    this.getEmployees();
  }


  getEmployees() {
    this.dataService.getEmployees().subscribe((result: Employee[]) => {
      this.employees = result;
      this.filtered = result;
    });
  }


 


  deleteEmployee(employeeId: Number){
        this.dataService.deleteEmployee(employeeId).subscribe(result => {
          window.location.reload();
          });
        }
 


       
        search(): void {
          if (!this.searchName) {
            // alert('Please enter a search term.');
            this.toast.error({ detail: 'Error Message', summary: 'Please enter a search term.', duration: 5000 });
            return;
          }
       
          this.filtered = this.employees.filter((employee) =>
          employee.pFirstName.toLowerCase().includes(this.searchName.toLowerCase())
          );
     
        }


        editEmployee(employeeId: Number): void {
          this.router.navigate(['employees', employeeId]);
        }


        }
