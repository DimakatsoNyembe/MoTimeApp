import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CalendarItem } from 'src/app/shared/calendaritem';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-add-calendar',
  templateUrl: './add-calendar.component.html',
  styleUrls: ['./add-calendar.component.css'],
})
export class AddCalendarComponent implements OnInit {
  calendarForm: FormGroup;


  constructor(private dataService: DataService, private router: Router, private fb: FormBuilder, private toast: NgToastService) {
    this.calendarForm = this.fb.group({
      calendarItemName: ['', Validators.required],
      calendarItemDescription: ['', Validators.required],
      location: ['', Validators.required],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
  }


  ngOnInit(): void {
    // ...
  }


  cancel() {
    this.router.navigate(['/calendar']);
  }


  onSubmit() {
    const calendarItemName: string = this.calendarForm.get('calendarItemName')?.value || '';
    const calendarItemDescription: string = this.calendarForm.get('calendarItemDescription')?.value || '';
    const location: string = this.calendarForm.get('location')?.value || '';
    const dateString: string = this.calendarForm.get('date')?.value || '';
    const dateString1: string = this.calendarForm.get('startTime')?.value || '';
    const dateString2: string = this.calendarForm.get('endTime')?.value || '';


    // Convert the dateString to a Date object
    const date: Date = dateString ? new Date(dateString) : new Date();
    const startTime: Date = dateString1 ? new Date(dateString1) : new Date();
    const endTime: Date = dateString2 ? new Date(dateString2) : new Date();


    const calendarItem: CalendarItem = {
      calendarId: 0,
      calendarItemName: calendarItemName,
      calendarItemDescription: calendarItemDescription,
      location: location,
      date: date,
      startTime: startTime,
      endTime: endTime
    };


    this.dataService.addCalendarItem(calendarItem).subscribe(result => {
      this.toast.success({ detail: 'Success Message', summary: 'Calendar item added successfully.', duration: 5000 });
      this.router.navigate(['/calendar']);
    });
  }
}
