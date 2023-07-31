import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HelpService } from 'src/app/services/help.service';
import { Help } from 'src/app/shared/help';
import { HelpTypeService } from 'src/app/services/help-type.service';
import { HelpType } from 'src/app/shared/helpType';

@Component({
  selector: 'app-edit-help',
  templateUrl: './edit-help.component.html',
  styleUrls: ['./edit-help.component.css'],
})
export class EditHelpComponent implements OnInit {
  helpId!: number;
  help: Help | null = null;
  helpTypes: HelpType[] = [];


  // Add properties for form fields
  helpName: string = '';
  helpDescription: string = '';
  helpType: number = 0;
  material: File | null = null;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private helpService: HelpService,
    private helpTypeService: HelpTypeService
  ) {}
  ngOnInit(): void {
    // Get the help ID from the route parameters
    this.route.params.subscribe(params => {
      this.helpId = +params['id'];
      this.loadHelp();
    });
 
    this.loadHelpTypes();
  }
 


  loadHelp(): void {
    // Fetch the help details from the server using the help ID
    this.helpService.GetHelp(this.helpId).subscribe(
      (help: Help) => {
        this.help = help;
        // Pre-fill the form fields with the existing data
        this.helpName = help.helpName;
        this.helpDescription = help.helpDescription;
        this.helpType = help.helpTypeId;
      },
      error => {
        console.log('Error loading Help:', error);
      }
    );
  }


  loadHelpTypes(): void {
    this.helpTypeService.GetAllHelpType().subscribe(
      (helpTypes: HelpType[]) => {
        this.helpTypes = helpTypes;
      },
      error => {
        console.log('Error loading Help Types:', error);
      }
    );
  }


  onFileChange(event: any): void {
    this.material = event.target.files.item(0);
  }


  onSubmit(): void {
    // Add validation here to ensure required fields are filled
    if (!this.helpName || !this.helpDescription || !this.helpType || !this.material) {
      console.log('Please fill all required fields.');
      return;
    }


    const formData = new FormData();
    formData.append('helpName', this.helpName);
    formData.append('helpDescription', this.helpDescription);
    formData.append('helpType', this.helpType.toString());
    formData.append('material', this.material);


    this.helpService.EditHelp(this.helpId, formData).subscribe(
      (updatedHelp: Help) => {
        console.log('Help updated successfully:', updatedHelp);
        this.router.navigate(['/help']);
      },
      error => {
        console.log('Error updating Help:', error);
      }
    );
  }


  cancel(): void {
    this.router.navigate(['/help']);
  }
}
