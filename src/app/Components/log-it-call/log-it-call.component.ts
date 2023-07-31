import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-log-it-call',
  templateUrl: './log-it-call.component.html',
  styleUrls: ['./log-it-call.component.css']
})
export class LogItCallComponent implements OnInit {
  isExpanded = false;
  timeStamp: string = ''; // Initialize the property with an empty string


  constructor(private datePipe: DatePipe) {}


  ngOnInit() {
    this.updateTimeStamp();
  }


  expandContact() {
    this.isExpanded = !this.isExpanded;
  }


  private updateTimeStamp() {
    const now = new Date();
    this.timeStamp = this.datePipe.transform(now, 'yyyy-MM-dd HH:mm:ss') || '';
  }


  getEmailLink() {
    const emailSubject = 'IT Support Request';
    const encodedTimeStamp = encodeURIComponent(this.timeStamp);
    const emailBody = `Timestamp: ${encodedTimeStamp}`;


    return `mailto:mbalithandolwethu1@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${emailBody}`;
  }
}
