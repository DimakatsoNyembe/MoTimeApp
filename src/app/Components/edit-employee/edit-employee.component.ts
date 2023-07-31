import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Component , OnInit} from '@angular/core';
import { Eemployee } from 'src/app/shared/eemployee';
import { User } from 'src/app/shared/user';
import { Employeetype } from 'src/app/shared/employeetype';
import { Employeestatus } from 'src/app/shared/employeestatus';
import { Region } from 'src/app/shared/region';
import { Division } from 'src/app/shared/division';
import { Managertype } from 'src/app/shared/managertype';
import { Resource } from 'src/app/shared/resource';
import { HttpHeaders } from '@angular/common/http';
import { Employee2 } from 'src/app/shared/employee2';
import { NgToastService } from 'ng-angular-popup';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent {

  users: User[] = [];
  employeeTypes: Employeetype[] = [];
  employeeStatuses: Employeestatus[] = [];
  regions: Region[] = [];
  divisions: Division[] = [];
  managerTypes: Managertype[] = [];
  resources : Resource[] = [];
  employeeId! : number;
  resourceId! : number;
  employeeTypeId!: number;
  employeeStatusId!: number;
  regionId!: number;
  divisionId!: number;
  managerTypeId!: number;
  userId! : number;

  eemployee: Employee2 = {
    employeeId: 0,
    resourceId: null,
    employeeTypeId: null,
    managerTypeId: null,
    userId: null,
    employeeStatusId: null,
    regionId: null,
    divisionId: null


  };


  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    private toast: NgToastService
  ) { }


  ngOnInit(): void {
    // this.route.paramMap.subscribe((params) => {
    //   const employeeId = Number(params.get('employeeId'));
    //   if (!isNaN(employeeId)) {
    //     this.employeeId = employeeId; // Save the employeeId to use it in the PUT request
    //     this.getEmployeeById(employeeId);
    //   }
    // });
    this.route.paramMap.subscribe((params) => {
      const employeeId = Number(params.get('employeeId'));
      if (!isNaN(employeeId)) {
        this.eemployee.employeeId = employeeId; // Save the employeeId to use it in the PUT request
        this.getEmployeeById(employeeId);
      }
    });
 
    this.fetchUsers();
    this.fetchEmployeeTypes();
    this.fetchEmployeeStatuses();
    this.fetchRegions();
    this.fetchDivisions();
    this.fetchManagerTypes();
    this.fetchResources();
  }


  showManagerTypeDropdown = false; // Set to false initially, as it should be hidden by default


  getEmployeeById(employeeId: number): void {
    this.dataService.getEmployee(employeeId).subscribe(
      (eemployee: Eemployee) => {
     
        this.eemployee = eemployee;


        // Set the initial selected values for the dropdowns based on the fetched employee data
        this.eemployee.userId = eemployee.userId;
        this.eemployee.resourceId = eemployee.resourceId;
        this.eemployee.employeeTypeId = eemployee.employeeTypeId;
        this.eemployee.employeeStatusId = eemployee.employeeStatusId;
        this.eemployee.regionId = eemployee.regionId;
        this.eemployee.divisionId = eemployee.divisionId;
        this.eemployee.managerTypeId = eemployee.managerTypeId;


        // Optionally, you can check if the selected employee type is 'manager' and toggle the visibility of the 'Manager Type' dropdown
        this.showManagerTypeDropdown = eemployee.employeeTypeId === 1;
      },
      (error) => {
        console.error('Error fetching employee:', error);
 
      }
    );}




  cancel(): void {
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


  areDropdownsSelected(): boolean {
    // Check if all dropdown properties have non-zero (or non-default) values
    return (
      this.eemployee.userId !== 0 &&
      this.eemployee.resourceId !== 0 &&
      this.eemployee.employeeTypeId !== 0 &&
      this.eemployee.employeeStatusId !== 0 &&
      this.eemployee.regionId !== 0 &&
      this.eemployee.divisionId !== 0 &&
      this.eemployee.managerTypeId !== 0
    );
  }


  onSubmit(): void {
 
    const employeeId = this.employeeId; // Make sure this.employeeId is set correctly beforehand
    const eemployee: Employee2 = { ...this.eemployee }; // Assuming this.eemployee has the employee data
 
    this.dataService.editEmployee(employeeId, eemployee).subscribe(
      (response) => {
        this.toast.success({ detail: 'Success Message', summary: 'Employee updated successfully', duration: 5000 });
      },
      (error) => {
        // Handle error here
        this.toast.error({ detail: 'Error Message', summary: 'Error updating employee', duration: 5000 });
   
      }
    );
  }
}

