import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/shared/client';
import { Router } from '@angular/router';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  clients: Client[] = [];


  constructor(private clientService: ClientService, private router: Router) {}


  ngOnInit(): void {
    this.getAllClients();
  }


  //Get all resource type
  getAllClients(): void {
    this.clientService.GetAllClients().subscribe(result => {
      this.clients = result;
    });
  }


  //Delete resource type
  DeleteClient(resourceTypeId: number): void {
    this.clientService.deleteClient(resourceTypeId).subscribe(() => {
      window.location.reload();
    });
  }


  editClient(clientId: number): void {
    localStorage.setItem('ClientId', clientId.toString());
    this.router.navigate(['/add-client']);
  }
 
 
}
