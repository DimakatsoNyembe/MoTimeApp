import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent {
  ResetToken: string = '';
  NewPassword: string = '';
  EmailAddress: string = '';
  validationErrors: string[] = [];
  registerFormGroup: FormGroup = this.fb.group({
    EmailAddress: ['', [Validators.required, Validators.email]],
    ResetToken: ['', [Validators.required]],
    NewPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
  })

  constructor(private route: ActivatedRoute, private apiService: APIService, private fb: FormBuilder, private router: Router) {
    const token = this.route.snapshot.queryParamMap.get('token');
    this.ResetToken = token !== null ? token : '';
  }
  resetPassword() {
    const payload = {
      emailAddress: this.EmailAddress,
      resetToken: this.ResetToken,
      newPassword: this.NewPassword
    };
    this.apiService.resetPassword(payload)
      .subscribe(
        () => {
          console.log('Password successfully');
          this.router.navigate(['/login']);
          // Handle success (e.g., show a success message)
        },
        error => {
          console.error('Failed to send password reset token', error);
          // Handle error (e.g., show an error message)
          if (error.status === 400 && error.error && error.error.errors) {
            const validationErrors = error.error.errors;
            // Process and display the validation errors as needed
          }
        }
      );
  }

}
