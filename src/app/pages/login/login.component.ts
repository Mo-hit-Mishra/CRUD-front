// login.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;

      this.authService.authenticate(credentials.email, credentials.password).subscribe({
        next: (response: any) => {
          console.log('Login successful:', response);
          localStorage.setItem('token', response.token);

          // Use the PageStateService to store the attempted URL before login
          // this.pageStateService.setRedirectUrl('/admin');

          // Navigate to the intended or default page after successful login
          this.router.navigate(['/admin']);
        },
        error: (error: any) => {
          console.error('Login failed:', error);
          this.errorMessage = 'Invalid email or password. Please try again.';
        },
      });
    }
  }

onForgetPassword(email: string = ''): void {
    // Check if the email is valid (you might want to use a regular expression or a validation library)
    if (!this.validateEmail(email)) {
      // Handle invalid email (e.g., show an error message to the user)
      console.error('Invalid email address');
      return;
    }
  
    // Call a service method to initiate the password reset process
    this.authService.resetPassword(email).subscribe(
      (response) => {
        // Handle success response from the server
        console.log('Password reset initiated successfully. Check your email for instructions.');
  
        // Optionally, you might want to navigate to a confirmation page
        // this.router.navigate(['/password-reset-confirmation']);
      },
      (error) => {
        // Handle error response from the server
        console.error('Error initiating password reset:', error);
  
        // Optionally, you might want to show an error message to the user
        // this.errorMessage = 'An error occurred while initiating the password reset process.';
      }
    );
  }
  
  private validateEmail(email: string): boolean {
    // Implement a basic email validation logic
    // You can use a regular expression or a library for more comprehensive email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
