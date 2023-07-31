import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HelpTypeService } from 'src/app/services/help-type.service';
import { HelpType } from 'src/app/shared/helpType';


@Component({
  selector: 'app-edit-help-type',
  templateUrl: './edit-help-type.component.html',
  styleUrls: ['./edit-help-type.component.css']
})
export class EditHelpTypeComponent implements OnInit {
  helpTypeForm = new FormGroup({
    helpTypeName: new FormControl(''),
    helpTypeDescription: new FormControl('')
  });


  helpType: HelpType | undefined;
  helpTypeId: number | undefined;


  constructor(
    private helpTypeService: HelpTypeService,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.helpTypeId = parseInt(localStorage.getItem('helpTypeId')!, 10);
    if (isNaN(this.helpTypeId)) {


    } else {
      this.loadHelpType();
    }
  }


  loadHelpType(): void {
    this.helpTypeService.GetHelpType(this.helpTypeId!).subscribe(result => {
      this.helpType = result;
      this.populateForm();
    });
  }


  populateForm(): void {
    if (this.helpType) {
      this.helpTypeForm.patchValue({
        helpTypeName: this.helpType.helpTypeName || '',
        helpTypeDescription: this.helpType.helpTypeDescription || ''
      });
    }
  }


  cancel(): void {
    localStorage.removeItem('helpTypeId');
    this.router.navigate(['/help-type']);
  }


  onSubmit(): void {
    if (this.helpType && this.helpTypeId) {
      const updatedHelpType: HelpType = {
        helpTypeId: this.helpTypeId,
        helpTypeName: this.helpTypeForm.value.helpTypeName || '',
        helpTypeDescription: this.helpTypeForm.value.helpTypeDescription || ''
      };


      this.helpTypeService.EditHelpType(updatedHelpType.helpTypeId, updatedHelpType).subscribe(result => {
        localStorage.removeItem('helpTypeId');
        this.router.navigate(['/help-type']);
      });
    }
  }
}
