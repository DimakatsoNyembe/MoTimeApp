import { Component, OnInit } from '@angular/core';
import { HelpService } from 'src/app/services/help.service';
import { Help } from 'src/app/shared/help';
import { HelpType } from 'src/app/shared/helpType';
import { HelpTypeService } from 'src/app/services/help-type.service';
import { Router } from '@angular/router';
import { Observable, catchError, combineLatest, map, of } from 'rxjs';


@Component({
  selector: 'app-user-help',
  templateUrl: './user-help.component.html',
  styleUrls: ['./user-help.component.css']
})
export class UserHelpComponent implements OnInit {
  helps: Help[] = [];
  helpTypes: HelpType[] = [];
  searchQuery: string = '';




  constructor(
    private helpService: HelpService,
    private helpTypeService: HelpTypeService,
    private router: Router
  ) {}


  ngOnInit(): void {
    // Fetch both helps and help types using combineLatest
    combineLatest([this.getHelps(), this.getHelpTypes()]).subscribe(([helps, helpTypes]) => {
      this.helps = helps.map(help => ({
        ...help,
        helpTypeName: this.getHelpTypeName(help.helpTypeId, helpTypes),
      }));
    });
  }
 
  getHelps(): Observable<Help[]> {
    return this.helpService.GetAllHelp();
  }


  getHelpTypes(): Observable<HelpType[]> {
    return this.helpTypeService.GetAllHelpType().pipe(catchError(() => of([])));
  }


  getHelpTypeName(helpTypeId: number, helpTypes: HelpType[]): string {
    const foundType = helpTypes.find(type => type.helpTypeId === helpTypeId);
    return foundType ? foundType.helpTypeName : 'Unknown';
  }


  downloadHelp(help: Help): void {
    // Implement the functionality to download the help here
    this.helpService.DownloadHelp(help.helpId).subscribe((data: any) => {
      const blob = new Blob([data], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = help.fileName || 'helpfile.bin';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
  searchHelps(): void {
    if (this.searchQuery.trim() === '') {
      // If the search query is empty, show all helps
      this.getHelps().subscribe(helps => {
        this.helps = helps.map(help => ({
          ...help,
          helpTypeName: this.getHelpTypeName(help.helpTypeId, this.helpTypes),
        }));
      });
    } else {
      // If the search query is not empty, filter helps based on the query
      const lowerCaseQuery = this.searchQuery.trim().toLowerCase();
      this.helps = this.helps.filter(
        help => help.helpName.toLowerCase().includes(lowerCaseQuery) ||
                help.helpDescription.toLowerCase().includes(lowerCaseQuery)
      );
    }
  }


}
