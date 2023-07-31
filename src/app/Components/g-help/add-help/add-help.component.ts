import { Component } from '@angular/core';
import { HelpService } from 'src/app/services/help.service';
import { HelpTypeService } from 'src/app/services/help-type.service';
import { HelpType } from 'src/app/shared/helpType';
import { Help } from 'src/app/shared/help';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-help',
  templateUrl: './add-help.component.html',
  styleUrls: ['./add-help.component.css']
})
export class AddHelpComponent {
  helpName: string = '';
  helpDescription: string = '';
  helpType: number = 0;
  material: File | null = null;
  helpTypes: HelpType[] = [];


  constructor(
    private helpService: HelpService,
    private helpTypeService: HelpTypeService,
    private router: Router
  ) {
    this.loadHelpTypes();
  }


  cancel(){
    this.router.navigate(['/help']);
  }


  loadHelpTypes(): void {
    this.helpTypeService.GetAllHelpType().subscribe(
      (helpTypes: HelpType[]) => {
        this.helpTypes = helpTypes;
      },
      (error) => {
        console.log('Error loading Help Types:', error);
      }
    );
  }


  onFileChange(event: any): void {
    this.material = event.target.files.item(0);
  }


  onSubmit(): void {
    if (!this.material) {
      console.log('Please select a file.');
      return;
    }


    const isManualHelp = this.helpTypes.find(helpType => helpType.helpTypeId === this.helpType)?.helpTypeName === 'manual';
    const isVideoHelp = this.helpTypes.find(helpType => helpType.helpTypeId === this.helpType)?.helpTypeName === 'video';


    if ((isManualHelp && this.material.type !== 'application/pdf') ||
        (isVideoHelp && !this.isVideoFile(this.material))) {
      console.log('Invalid file format. Please upload a valid file.');
      return;
    }


    const formData = new FormData();
    formData.append('helpName', this.helpName);
    formData.append('helpDescription', this.helpDescription);
    // formData.append('helpType', this.helpType.toString());
    formData.append('helpTypeId', this.helpType.toString());
    formData.append('material', this.material);


    this.helpService.AddHelp(formData).subscribe(
      (newHelp: Help) => {
        console.log('Help added successfully:', newHelp);
        this.router.navigate(['/help']);
      },
      (error) => {
        console.log('Error adding Help:', error);
      }
    );
  }


  private isVideoFile(file: File): boolean {
    // Valid video file extensions
    const videoExtensions = ['mp4', 'mov', 'avi', 'wmv', 'flv', 'webm'];


    const fileNameParts = file.name.split('.');
    const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();


    return videoExtensions.includes(fileExtension);
  }
}
