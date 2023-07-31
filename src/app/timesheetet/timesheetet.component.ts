import { AfterViewInit, Component, EventEmitter, Output, SimpleChanges, ViewChild, OnInit } from '@angular/core';
import { DayPilot, DayPilotSchedulerComponent } from 'daypilot-pro-angular';
import { DataService } from '../timesheetet/data.Service';
import { Events } from './Event';
import { DatePipe } from '@angular/common';
import { Project, User } from './Employees';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-timesheetet',
  templateUrl: './timesheetet.component.html',
  styleUrls: ['./timesheetet.component.css']
})
export class TimesheetetComponent  implements AfterViewInit, OnInit {
 
  isPopupVisible: boolean = false;
  ConfirmSubmit: boolean = false;
  isScheduleVisible: boolean= true;
  date: string = ''; // Add this property to store the selected date
  emp!: User;
  selectedMonth: number =0;
  projects: Project[] = [];
  selectedProject: Project | null = null; // If you want to store the selected project
  
showCreateEventPopup() {
  this.isPopupVisible = true;
}
showConfirmationDialog()
{
  this.ConfirmSubmit = true;
}
onConfirmationCancel()
{
  this.ConfirmSubmit = false;
}


  @ViewChild(DayPilotSchedulerComponent, { static: false })
  timesheet!: DayPilotSchedulerComponent;
  // Properties for the input fields
  clients: string[] = ['Client 1', 'Client 2', 'Client 3'];
  title: string = '';
  comments: string = '';
  startTime: string = '';
  endTime: string = '';
  recurring: boolean = false;
  recurringWeeks: number = 1;
  days: { name: string, value: boolean }[] = [
    { name: 'Monday', value: false },
    { name: 'Tuesday', value: false },
    { name: 'Wednesday', value: false },
    { name: 'Thursday', value: false },
    { name: 'Friday', value: false },
  ];
  employees: any[] = [];
  month : string ="0";
  employee: any;
  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];
  config: DayPilot.SchedulerConfig = {
   
    rowHeaderColumns: [
      {text: "Date"},
      {text: "Day", width: 50},
      {text: "Total", width: 40},
    ],
    timeHeaders: [
      {groupBy: "Hour"},
      {groupBy: "Cell", format: "mm"}
    ],
    scale: "CellDuration",
    cellDuration: 15,
    startDate: this.getStartDate(this.month),
    days: 31,
    viewType: "Days",
    showNonBusiness: true,
    businessWeekends: false,
    allowEventOverlap: false,
    onTimeRangeSelected: async (args) => {
   
        this.startTime = args.start.toString("HH:mm");
        this.endTime = args.end.toString("HH:mm");
        this.date = new DayPilot.Date(args.start).toString("yyyy-MM-dd");        
        this.showCreateEventPopup();
    },
   
    onEventMoved: (args) => {


      const eventId = args.e.data.id; // Assuming the event has an 'id' property
      const updatedEvent = {
        start: args.newStart.toString(), // Convert to string to match the format expected by the API
        end: args.newEnd.toString(),
      };
      // Get the current event data from the data service
    this.ds.getEventById(eventId).subscribe(
      (currentEvent: Events) => {
        // Update the current event object with the updated start and end properties
        currentEvent.Start = new Date(updatedEvent.start);
        currentEvent.End = new Date(updatedEvent.end);


        // Add 2 hours to the startDateTime
        currentEvent.Start.setHours(currentEvent.Start.getHours() + 2);
        // Add 2 hours to the endDateTime
        currentEvent.End.setHours(currentEvent.End.getHours() + 2);


        // Call the updateEvent method to update the event on the server
        this.ds.updateEvent(eventId, currentEvent).subscribe(
          (result) => {
            // The event has been successfully updated on the server
            args.control.message("Event Moved: " + args.e.text());
          },
          (error) => {
            console.error("Error moving event:", error);
          }
        );
      },
      (error) => {
        console.error("Error retrieving event data:", error);
      }
    );
    },
    onEventResized: (args) => {
      const eventId = args.e.data.id; // Assuming the event has an 'id' property
      const updatedEvent = {
        start: args.newStart.toString(), // Convert to string to match the format expected by the API
        end: args.newEnd.toString(),
      };
      // Get the current event data from the data service
    this.ds.getEventById(eventId).subscribe(
      (currentEvent: Events) => {
        // Update the current event object with the updated start and end properties
        currentEvent.Start = new Date(updatedEvent.start);
        currentEvent.End = new Date(updatedEvent.end);
        // Add 2 hours to the startDateTime
        currentEvent.Start.setHours(currentEvent.Start.getHours() + 2);
        // Add 2 hours to the endDateTime
        currentEvent.End.setHours(currentEvent.End.getHours() + 2);


        // Call the updateEvent method to update the event on the server
        this.ds.updateEvent(eventId, currentEvent).subscribe(
          (result) => {
            // The event has been successfully updated on the server
            args.control.message("Event resized: " + args.e.text());
          },
          (error) => {
            console.error("Error updating event:", error);
          }
        );
      },
      (error) => {
        console.error("Error retrieving event data:", error);
      }
    );
     
    },
    eventDeleteHandling: "Update",
    onEventDeleted: (args) => {
      const eventId = args.e.data.id; // Assuming the event has an 'id' property


      this.ds.getEventById(eventId).subscribe(
        (currentEvent: Events) => {
         
          // Call the updateEvent method to update the event on the server
          this.ds.deleteEvent(eventId).subscribe(
            (result) => {
              // The event has been successfully updated on the server
              args.control.message("Event deleted: " + args.e.text());
            },
            (error) => {
              console.error("Error deleting event:", error);
            }
          );
        })
         
    },
    onEventClick: (args) => {
      // Do nothing when an event is clicked
    },
   
    onBeforeRowHeaderRender: args => {
      const day = args.row.start.toString("ddd");
      args.row.columns[1].text = `${day}`;


      const duration = args.row.events.totalDuration();
      if (duration.totalSeconds() === 0) {
        return;
      }


      let hours = duration.toString('H:mm');
      if (duration.totalDays() >= 1) {
        hours = Math.floor(duration.totalHours()) + ':' + duration.toString('mm');
      }
      args.row.columns[2].text = `${hours}`;


      const max = DayPilot.Duration.ofHours(8);
      const pct = args.row.events.totalDuration().totalSeconds() / max.totalSeconds();
      args.row.columns[2].areas = [
        {
          bottom: 0,
          left: 0,
          width: 40,
          height: 4,
          backColor: "#ffe599",
        },
        {
          bottom: 0,
          left: 0,
          width: 40 * pct,
          height: 4,
          backColor: "#f1c232",
        }
      ];
    },
    onBeforeEventRender: args => {
      const duration = new DayPilot.Duration(args.data.start, args.data.end);
      args.data.areas = [
        { right: 2, top: 0, bottom: 0, width: 30, fontColor: "#999999", text: duration.toString('h:mm'), style: 'display: flex; align-items: center'}
      ];
    }
   
 
  };


  constructor(private ds: DataService, private fb: FormBuilder ) {
  }
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }


  @Output() createEvent = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();


  createNewEvent() {


   
    // Combine date and time into datetime using DayPilot.Date.toString()
    const startDateTime = new Date(this.date + " " + this.startTime);
    const endDateTime = new Date(this.date + " " + this.endTime);


    // Add 2 hours to the startDateTime
    startDateTime.setHours(startDateTime.getHours() + 2);
    // Add 2 hours to the endDateTime
    endDateTime.setHours(endDateTime.getHours() + 2);
    if(this.selectedProject!=null)
    {
      console.log(this.selectedProject);
      console.log(this.selectedProject);
      const newEvent = new Events( this.employee ,this.selectedProject.toString(), this.title+" "+this.comments, startDateTime.toString(), endDateTime.toString(), "#6aa84f");
   
      this.ds.addEvent(newEvent).subscribe((result) => {
      // The result contains the newly added event data returned by the API
      // console.log(result);
      // Update the timesheet with the new event
      this.monthSelectedChanged();


        // Hide the create event popup
        this.isPopupVisible = false;
        this.resetTextboxes();
      });
    }
  }


  onCancel() {
    this.cancel.emit();
    this.isPopupVisible = false;
  }
  monthSelected(selectedMonth: number) {
    this.month = selectedMonth.toString();
    console.log('Selected Month:', selectedMonth);


    // Update the timesheet when the month is changed
    this.config.startDate = this.getStartDate(this.month);
    this.timesheet.control.update({ startDate: this.config.startDate });
  }
  getStartDate(month: string): string {
    const monthNumber = Number(month)+1;
    const year = new Date().getFullYear(); // Get the current year
    return `${year}-${monthNumber < 10 ? '0' : ''}${monthNumber}-01`;
  }


  loadProjects(): void {
    this.ds.getProjects().subscribe(
      (projects: Project[]) => {
        this.projects = projects;
      },
      (error) => {
        console.error('Error loading projects:', error);
      }
    );
  }
 
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['month'] && !changes['month'].firstChange) {
      this.config.startDate = this.getStartDate(this.month);
      this.timesheet.control.update({ startDate: this.config.startDate });
    }
  }
  resetTextboxes() {
    this.title = '';
    this.comments = '';
    this.startTime = '';
    this.endTime = '';
  }
  monthSelectedChanged() {
    // Calculate the 'from' and 'to' dates for the selected month
    const year = new Date().getFullYear(); // Get the current year
    const monthNumber = this.selectedMonth; // Use the selected month index directly
    const firstDayOfMonth = new Date(year, monthNumber, 1);
    const lastDayOfMonth = new Date(firstDayOfMonth); // Make a copy
    lastDayOfMonth.setMonth(lastDayOfMonth.getMonth() + 1);


    const from = new DayPilot.Date(firstDayOfMonth);
    const to = new DayPilot.Date(lastDayOfMonth);
 
    // Call the DataService to get the events for the selected month
    this.ds.getEvents(from, to, this.employee).subscribe(events => {
      this.timesheet.control.update({ events });
      console.log("-------")
      console.log(events);
    });
  }
  submitTimeMonthlyTimesheet()
  {
    console.log("Ping");
    console.log(this.employee);
    console.log(this.month);


    this.ds.submitTimesheetEvent(parseInt(this.employee), (parseInt(this.month)+1)).subscribe(
      () => {
        // Success: Handle the success response
        console.log('Timesheet submitted successfully.');
        this.timesheet.control.message("Timesheet submitted successfully."); // Display success message
      },
      (error) => {
        // Error: Handle the error response
        console.error('Error submitting timesheet:', error);
        this.timesheet.control.message("Error submitting timesheet."); // Display error message
      }
    );
    this.onConfirmationCancel();
  }
  monthTimeSelected(selectedMonth: number) {
    // Calculate the 'from' and 'to' dates for the selected month
    const year = new Date().getFullYear(); // Get the current year
    const monthNumber = selectedMonth + 1; // Increment month by 1 since getStartDate expects 1-based months
    const firstDayOfMonth = new Date(year, monthNumber - 1, 1);
    const lastDayOfMonth = new Date(year, monthNumber, 0);
    const from = new DayPilot.Date(firstDayOfMonth);
    const to = new DayPilot.Date(lastDayOfMonth);


    // Update the timesheet when the month is changed
    this.config.startDate = this.getStartDate(selectedMonth.toString());
    this.timesheet.control.update({ startDate: this.config.startDate });


    // Call the DataService to get the events for the selected month
    this.ds.getEvents(from, to, this.employee).subscribe(events => {
      console.log("zzzz"+events);


      this.timesheet.control.update({ events });
    });
 
  }
  employeeSelected($event: Event) {
    const from = this.timesheet.control.visibleStart();
    const to = this.timesheet.control.visibleEnd();
    this.ds.getEvents(from, to, this.employee).subscribe(events => {
      console.log(this.employee);
      console.log(events);
      this.timesheet.control.update({events});
    });


  }


  ngAfterViewInit(): void {


    const currentDate = new Date();
    this.month = currentDate.getMonth().toString();
    this.config.startDate = this.getStartDate(this.month);
    this.timesheet.control.update({ startDate: this.config.startDate });


    const firstDay = this.timesheet.control.visibleStart().getDatePart();
    const businessStart = this.timesheet.control.businessBeginsHour || 9;
    const scrollToTarget = firstDay.addHours(businessStart);
    this.timesheet.control.scrollTo(scrollToTarget);


    // @ts-ignore
    window["dp"] = this.timesheet.control;


    this.ds.getEmployees().subscribe(employees => {
      this.employees = employees;
     //console.log(employees);
     console.log( this.employees);
      this.employeeSelected(new Event("change"));
    });


    this.selectedMonth = currentDate.getMonth(); // Set selectedMonth to the current month (0 to 11)
    this.loadProjects();
 
  }


}


