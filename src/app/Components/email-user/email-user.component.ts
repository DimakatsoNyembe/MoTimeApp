import { Component } from '@angular/core';


interface Employee {
  id: number;
  email: string;
  name: string;
}


@Component({
  selector: 'app-email-user',
  templateUrl: './email-user.component.html',
  styleUrls: ['./email-user.component.css']
})
export class EmailUserComponent {
  employees: Employee[] = [
    { id: 1, name: 'Dimakatso Nyembe', email: 'U18270574@tuks.co.za' },
    { id: 2, name: 'Sinenhlanhla Dlamini', email: '19028386@tuks.co.za' },
    { id: 3, name: 'Siphesihle Shabangu', email: '19256622@tuks.co.za' },
    { id: 4, name: 'Noluthando Dlamini', email: '20471042@tuks.co.za' },
    { id: 5, name: 'Lethabo Gwadi', email: '18183485@tuks.co.za' }
  ];


  selectedEmployees: Employee[] = [];


  selectEmployee(employee: Employee) {
    this.selectedEmployees.push(employee);
  }


  removeEmployee(employee: Employee) {
    const index = this.selectedEmployees.findIndex(emp => emp.id === employee.id);
    if (index !== -1) {
      this.selectedEmployees.splice(index, 1);
    }
  }


  launchOutlook() {
    if (this.selectedEmployees.length === 0) {
      // Show a toast message or alert indicating that no employees are selected
      // For example, you can use console.log, alert, or a custom toast component
      console.log('Please select an employee before sending the email.');
      return;
    }


    const recipientEmails = this.selectedEmployees.map(emp => emp.email).join(',');
    const subject = 'Work';
 
    // Adjust the greeting based on the number of selected employees
    let greeting = this.selectedEmployees.length === 1 ? 'Dear employee,' : 'Dear employees,';
 
    // Add additional content to the email body
    const body = `${greeting}\n\nPlease find the details of our upcoming meeting below:\n\n...`;
 
    const mailtoLink = `mailto:${recipientEmails}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
 
    // Use window.open to open the email client with the mailto link
    window.open(mailtoLink, '_self');
  }
}

