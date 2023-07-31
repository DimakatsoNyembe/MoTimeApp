import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Employee } from 'src/app/shared/employee';
import { Eemployee } from 'src/app//shared/eemployee';
import { User } from 'src/app/shared/user';
import { Employeetype } from 'src/app//shared/employeetype';
import { Employeestatus } from 'src/app//shared/employeestatus';
import { Region } from 'src/app/shared/region';
import { Division } from 'src/app/shared/division';
import { Managertype } from 'src/app/shared/managertype';
import { Resource } from 'src/app/shared/resource';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  existingEmployeeTypeNames: number[] = [];


  users: User[] = [];
  employeeTypes: Employeetype[] = [];
  employeeStatuses: Employeestatus[] = [];
  regions: Region[] = [];
  divisions: Division[] = [];
  managerTypes: Managertype[] = [];
  resources : Resource[] = [];


  employee: Eemployee = {
    employeeId: 0,
    userId: 0,
    resourceId: 0,
    employeeTypeId: 0,
    employeeStatusId: 0,
    regionId: 0,
    divisionId: 0,
    managerTypeId: 0,


    user: 0,
    resource: 0,
    employeetype: 0,
    employeestatus: 0,
    region: 0,
    division: 0,
    managertype: 0
  };


  constructor(
    private dataService: DataService,
 
    private router: Router,
    private toast: NgToastService
  ) {}


  ngOnInit(): void {


    this.fetchUsers();
    this.fetchEmployeeTypes();
    this.fetchEmployeeStatuses();
    this.fetchRegions();
    this.fetchDivisions();
    this.fetchManagerTypes();
    this.fetchResources();
    this.getExistingUserId();


  }


 


  showManagerTypeDropdown = false; // Set to false initially, as it should be hidden by default


  onEmployeeTypeChange(): void {
    // Check if the selected employee type is 'manager' and toggle the visibility of the 'Manager Type' dropdown
    this.showManagerTypeDropdown = this.employee.employeetype === 1;
  }


getExistingUserId() {
  this.dataService.getEmployees().subscribe((employees: Eemployee[]) => {
    // Filter out null values and keep only the userIds
    this.existingEmployeeTypeNames = employees
      .map((employee) => employee.userId)
      .filter((userId) => !!userId) as number[];
  });
}


onSubmit(): void {
  this.dataService.addEmployee(this.employee).subscribe(
        (result) => {
          this.toast.success({ detail: 'Success Message', summary: 'Employee added successfully.', duration: 5000 });
        },
        (error) => {
          this.toast.error({ detail: 'Error Message', summary: 'Error adding employee.', duration: 5000 });
        }
      );
      this.router.navigate(['/employees']);
}






  private fetchResources(): void {
    this.dataService.getResources().subscribe(
      (resources) => {
        this.resources = resources;
      },
      (error) => {
        console.error('Error fetching resources:', error);
      }
    );
  }




  private fetchUsers(): void {
    this.dataService.getUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }


  private fetchEmployeeTypes(): void {
    this.dataService.getEmployeeTypes().subscribe(
      (types) => {
        this.employeeTypes = types;
      },
      (error) => {
        console.error('Error fetching employee types:', error);
      }
    );
  }


  private fetchEmployeeStatuses(): void {
    this.dataService.getEmployeeStatuses().subscribe(
      (statuses) => {
        this.employeeStatuses = statuses;
      },
      (error) => {
        console.error('Error fetching employee statuses:', error);
      }
    );
  }


  private fetchRegions(): void {
    this.dataService.getRegions().subscribe(
      (regions) => {
        this.regions = regions;
      },
      (error) => {
        console.error('Error fetching regions:', error);
      }
    );
  }


  private fetchDivisions(): void {
    this.dataService.getDivisions().subscribe(
      (divisions) => {
        this.divisions = divisions;
      },
      (error) => {
        console.error('Error fetching divisions:', error);
      }
    );
  }


  private fetchManagerTypes(): void {
    this.dataService.getManagerTypes().subscribe(
      (managerTypes) => {
        this.managerTypes = managerTypes;
      },
      (error) => {
        console.error('Error fetching manager types:', error);
      }
    );
  }


  cancel() {
    this.router.navigate(['/employees']);
  }


  areDropdownsSelected(): boolean {
    // Check if all dropdown properties have non-zero (or non-default) values
    return (
      this.employee.user !== 0 &&
      this.employee.resource !== 0 &&
      this.employee.employeetype !== 0 &&
      this.employee.employeestatus !== 0 &&
      this.employee.region !== 0 &&
      this.employee.division !== 0 &&
      this.employee.managertype !== 0
    );
  }


}
