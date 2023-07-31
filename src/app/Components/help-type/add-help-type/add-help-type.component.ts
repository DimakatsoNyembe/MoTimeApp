import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HelpTypeService } from 'src/app/services/help-type.service';
import { HelpType } from 'src/app/shared/helpType';
@Component({
  selector: 'app-add-help-type',
  templateUrl: './add-help-type.component.html',
  styleUrls: ['./add-help-type.component.css']
})
export class AddHelpTypeComponent implements OnInit {




  HelptypeForm = new FormGroup(
    {
      helpTypeName: new FormControl(''),
      helpTypeDescription:  new FormControl('')


    })
    constructor( private router: Router,private helptypeservice: HelpTypeService){}
   
  ngOnInit(): void {
  }
  cancel(){
    this.router.navigate(['/help-type'])
  }


 
  onSubmit() {
    const helpTypeName: string = this.HelptypeForm.get('helpTypeName')?.value || '';
    const helpTypeDescription: string = this.HelptypeForm.get('helpTypeDescription')?.value || '';
 
    const helpType: HelpType = {
      helpTypeId: 0, // Assuming you set the appropriate value on the server-side
      helpTypeName: helpTypeName,
      helpTypeDescription: helpTypeDescription
    };
 
    this.helptypeservice.AddHelpType(helpType).subscribe(result => {
      this.router.navigate(['/help-type']);
    });
  }
 
}
