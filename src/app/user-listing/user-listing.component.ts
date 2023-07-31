import { Component, ViewChild } from '@angular/core';
import { APIService } from '../services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.css']
})
export class UserListingComponent {
  constructor(private apiService: APIService, private toastr: ToastrService)
  {}
  userlist: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator !:MatPaginator;

  // LoadUser()
  // {
  //   this.apiService.GetUserRole()?.subscribe(res =>
  //     {this.userlist = res; });
      
  // }
  displayedColumns: string[] = ['Name', 'Surname', 'Email', 'Status', 'Action'];
  UpdateUser()
  {
      this.toastr.success('God is AMAZING');
  }


}
