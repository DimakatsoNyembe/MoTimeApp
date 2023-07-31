import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';


import { AddCalendarItem } from 'src/app/shared/addCalendarItem';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-edit-calendar',
  templateUrl: './edit-calendar.component.html',
  styleUrls: ['./edit-calendar.component.css']
})
export class EditCalendarComponent implements OnInit {
  calendarForm = new FormGroup(
    {
      calendarItemName: new FormControl('',Validators.required),
      calendarItemDescription: new FormControl('',Validators.required),
      location : new FormControl('',Validators.required),
      date: new FormControl<Date | null>(null, Validators.required),
      startTime: new FormControl<Date | null>(null, Validators.required),
      endTime: new FormControl<Date | null>(null, Validators.required)
    });


 
    calendarItem: AddCalendarItem | null = null;


  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: NgToastService
  ) {}


  ngOnInit(): void {
    this.dataService
      .getCalendarItem(+this.route.snapshot.params['calendarItemId'])
      .subscribe(result => {
        this.calendarItem = result as AddCalendarItem;
        if (this.calendarItem) {
          this.calendarForm.patchValue({
            calendarItemName : this.calendarItem.calendarItemName || '',
            calendarItemDescription : this.calendarItem.calendarItemDescription || '',
            location : this.calendarItem.location || '',
            // date : this.calendarItem.date || ''
            date: this.calendarItem.date || null ,
            startTime : this.calendarItem.startTime || null ,
            endTime : this.calendarItem.endTime || null ,
          });
        }
      });
  }


  cancel() {
    this.router.navigate(['/calendar']);
  }


  onSubmit() {
    if (this.calendarItem) {
      const updated: AddCalendarItem = {
        calendarId : this.calendarItem.calendarId,
   
        calendarItemName : this.calendarForm.value.calendarItemName || null,
        calendarItemDescription : this.calendarForm.value.calendarItemDescription || null,
       location : this.calendarForm.value.location  || null,
       date : this.calendarForm.value.date  || null,
       startTime : this.calendarForm.value.startTime || null,
       endTime : this.calendarForm.value.endTime  || null
      };


      this.dataService
        .editCalendarItem(updated.calendarId, updated)
        .subscribe(
          result => {
            if (this. calendarItem) {
              this.calendarItem.calendarItemName = updated.calendarItemName;
              this.calendarItem.calendarItemDescription = updated.calendarItemDescription;
              this.calendarItem.location = updated.location;
              this.calendarItem.date = updated.date;
              this.calendarItem.startTime = updated.startTime;
              this.calendarItem.endTime = updated.endTime;
            }
            this.toast.success({ detail: 'Success Message', summary: 'Calendar updated successfully.', duration: 5000 });
            this.router.navigate(['/calendar']);
          },
          error => {
            this.toast.error({ detail: 'Error Message', summary: 'Calendar update unsuccessful', duration: 5000 });
           
          }
        );
    }
  }
}
