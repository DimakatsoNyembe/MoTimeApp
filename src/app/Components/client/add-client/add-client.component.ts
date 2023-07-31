import { Component , OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/shared/client';


@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit{
  ClientForm = new FormGroup(
    {
      Account: new FormControl(''),
      Department:  new FormControl(''),
      SiteCode:  new FormControl(''),
      ProjectCode:  new FormControl(''),
      AccountManager:  new FormControl(''),


    })
    constructor( private router: Router,private clientService: ClientService){}
   
  ngOnInit(): void {
  }
  cancel(){
    this.router.navigate(['/client'])
  }


  onSubmit() {
    const Account: string = this.ClientForm.get('Account')?.value || '';
    const Department: string = this.ClientForm.get('Department')?.value || '';
    const SiteCode: string = this.ClientForm.get('SiteCode')?.value || '';
    const ProjectCode: string = this.ClientForm.get('ProjectCode')?.value || '';
    const AccountManager: string = this.ClientForm.get('AccountManager')?.value || '';
    
    const client: Client = {
      ClientId: 0, // Assuming you set the appropriate value on the server-side
      Account: Account,
      Department: Department,
      SiteCode: SiteCode,
      ProjectCode: ProjectCode,
      AccountManager: AccountManager

    };
 
    this.clientService.addClient(client).subscribe(result => {
      this.router.navigate(['/resource-type']);
    });

}
}
