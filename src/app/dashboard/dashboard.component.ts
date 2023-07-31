import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api.service';
import { UserStoreService } from '../user-store.service';
import { UserDetails } from 'src/app/shared/user-details';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  public users: any = [];
  public fullName: string = "";
  constructor(private apiService: APIService, private userStore: UserStoreService){}

  ngOnInit(): void {
    // this.apiService.getAllUsers().subscribe(res =>
    //   {
    //     this.users = res;
    //   });
    //   this.userStore.getFullName().subscribe(val =>{
    //     let myNameFromToken = this.apiService.getUserNameFromToken();
    //     this.fullName = val || myNameFromToken;
    //   })
  }

  logOut()
  {
    this.apiService.logOut();
  }

}
