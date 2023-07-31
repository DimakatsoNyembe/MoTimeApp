

export class Events {
    id: number =0;
    Employee: string;
    Project : string;
    Text: string;
    Start: Date;
    End: Date;
    BarColor: string;
  
  
    constructor(
      Employee: string,
      Project: string,
      text: string,
      start: string, // Use string instead of Date for start and end properties
      end: string,
      barColor: string
    ) {
      this.Employee = Employee;
      this.Project = Project;
      this.Text = text;
      this.Start = new Date(start); // Convert string to Date
      this.End = new Date(end); // Convert string to Date
      this.BarColor = barColor;
    }
  }
  