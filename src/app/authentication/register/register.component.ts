import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from 'src/app/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDatepickerToggle } from '@angular/material/datepicker';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/authentication/Helpers/validateForm';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerFormGroup!: FormGroup;
  hireDatePicker!: MatDatepickerToggle<any>;
  datePicker!: MatDatepickerToggle<any>;
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";

  dateValidator: AsyncValidatorFn = (control: AbstractControl<any>): Promise<ValidationErrors | null> => {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
  
    if (selectedDate > currentDate) {
      return Promise.resolve({ futureDate: true });
    }
  
    return Promise.resolve(null);
  };
  

  constructor(private router: Router, private apiService: APIService, private fb: FormBuilder, private snackBar: MatSnackBar, private toastr: NgToastService) {  
  }
  

  ngOnInit(): void {
    this.registerFormGroup = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      EmailAddress: ['', Validators.required],
      Password: ['', Validators.required]
    })
  }

  
  // RegisterUser() {
  //   if (this.registerFormGroup.valid) {
  //     console.log('Form is valid');
  //     this.apiService.RegisterUser(this.registerFormGroup.value).subscribe(
  //       (response) => {
  //         this.toastr.success('Please contact admin to enable access','The user was successfully registered');
  //         console.log('Registration response:', response);
  //         this.registerFormGroup.reset();
  //         this.router.navigate(['/login']).then((navigated: boolean) => {
          
  //         });
  //       },
  //       (error) => {
  //         // Handle registration error here
  //         console.error('Error occurred while registering user:', error);
  //       }
  //     );
  //   } else {
  //     this.toastr.warning('Please enter valid information');
  //   }
    
  // }
  hideShowPassword()
  {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
  onSubmit()
  {
    if(this.registerFormGroup.valid)
    {
      this.apiService.Register(this.registerFormGroup.value)
      .subscribe({
        next:(res=>{
          this.toastr.success({detail: "SUCCESS", summary:res.message, duration: 5000});
          this.registerFormGroup.reset();
          this.router.navigate(['login']);
        })
        ,error:(err=>{
          this.toastr.error({detail: "ERROR", summary:"Something went wrong!!", duration: 5000});
        })
      })
      console.log(this.registerFormGroup.value);
    }
    else 
    {
      ValidateForm.validateAllFormFields(this.registerFormGroup);
      alert("Your form is invalid");
    }

  }

  
}
