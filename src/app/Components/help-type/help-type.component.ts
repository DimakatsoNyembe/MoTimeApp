import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelpType } from 'src/app/shared/helpType';
import { HelpTypeService } from 'src/app/services/help-type.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-help-type',
  templateUrl: './help-type.component.html',
  styleUrls: ['./help-type.component.css']
})
export class HelpTypeComponent implements OnInit {
  helpTypes: HelpType[] = [];
  allHelpTypes: HelpType[] = [];
  searchText: string = '';


  constructor(private helpTypeService: HelpTypeService, private router: Router, private toastr: ToastrService) { }


  ngOnInit(): void {
    this.getAllHelpType();
  }


  getAllHelpType(): void {
    this.helpTypeService.GetAllHelpType().subscribe(result => {
      this.helpTypes = result;
      this.allHelpTypes = result; // Keep a copy of all help types for filtering
    });
  }


  deleteHelpType(helpTypeId: number): void {
    this.helpTypeService.DeleteHelpType(helpTypeId).subscribe(() => {
      window.location.reload();
    });
  }


  editHelpType(helpTypeId: number): void {
    localStorage.setItem('helpTypeId', helpTypeId.toString());
    this.router.navigate(['/help-type/edit']);
  }


  onSearch(): void {
    // Filter the helpTypes based on the search text
    const searchText = this.searchText.toLowerCase().trim();
    this.helpTypes = this.allHelpTypes.filter(helpType =>
      helpType.helpTypeName?.toLowerCase().includes(searchText) ||
      helpType.helpTypeDescription?.toLowerCase().includes(searchText)
    );
  }
}
