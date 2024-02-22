// forget-password.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  forgetPasswordForm: FormGroup;

  constructor(private fb: FormBuilder,private authService: AuthService) {
    this.forgetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.forgetPasswordForm.valid) {
      const email = this.forgetPasswordForm.value.email;

      // Call your AuthService method to initiate the password reset
      this.authService.resetPassword(email).subscribe(
        (response) => {
          console.log('Initiate password reset for email:', email);
          console.log('Response from backend:', response);
          // Optionally, you can handle the response from the backend
          // For example, show a success message to the user
        },
        (error) => {
          console.error('Error initiating password reset:', error);
          // Optionally, you can handle the error
          // For example, show an error message to the user
        }
      );
    }
  }
}
