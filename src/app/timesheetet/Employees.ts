export class User {
    userId: number = 0;
   
    firstName: string = '';
    lastName: string = '';
    
    emailAddress: string = '';
    
    alerts: any[] = [];
    auditLogs: any[] = [];
    employees: any[] = [];
    passwords: any[] = [];
    systemAdministrators: any[] = [];
    title: any = null;
    userUserRoles: any[] = [];
  }
  
  
  export class Project {
    projectId: number;
    adminId: number;
    clientId: number;
    projectStatusId: number;
    projectName: string;
    startDate: Date;
    endDate: Date;
    admin: any; // Replace 'any' with the type of 'admin' property if available
    client: any; // Replace 'any' with the type of 'client' property if available
    projectAllocations: any[]; // Replace 'any' with the type of 'projectAllocations' property if available
    projectStatus: any; // Replace 'any' with the type of 'projectStatus' property if available
    tasks: any[]; // Replace 'any' with the type of 'tasks' property if available
    timecards: any[]; // Replace 'any' with the type of 'timecards' property if available
    timesheets: any[]; // Replace 'any' with the type of 'timesheets' property if available
  
  
    constructor(
      projectId: number,
      adminId: number,
      clientId: number,
      projectStatusId: number,
      projectName: string,
      startDate: Date,
      endDate: Date,
      admin: any,
      client: any,
      projectAllocations: any[],
      projectStatus: any,
      tasks: any[],
      timecards: any[],
      timesheets: any[]
    ) {
      this.projectId = projectId;
      this.adminId = adminId;
      this.clientId = clientId;
      this.projectStatusId = projectStatusId;
      this.projectName = projectName;
      this.startDate = startDate;
      this.endDate = endDate;
      this.admin = admin;
      this.client = client;
      this.projectAllocations = projectAllocations;
      this.projectStatus = projectStatus;
      this.tasks = tasks;
      this.timecards = timecards;
      this.timesheets = timesheets;
    }
  }
  
  
  