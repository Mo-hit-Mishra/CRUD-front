import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent {
  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.registrationForm = this.fb.group({
      fullName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const userData = this.registrationForm.value;

      // Make an HTTP POST request to your Node.js backend
      this.http
        .post('http://localhost:3000/auth1/register', userData)
        .subscribe({
          next: (response: any) => {
            console.log('User registration successful:', response);

            // Show a success alert
            this.showAlertMessage('User registration successful', 'success');

            // Reload the page after 5 seconds
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          },
          error: (error: any) => {
            console.error('User registration failed:', error);

            // Show an error alert
            this.showAlertMessage('User registration failed', 'error');
          },
        } as Observer<any>);
    }
  }

  private showAlertMessage(message: string, panelClass: string): void {
    this.snackBar.open(message, '', {
      duration: 3000, // Set the duration to at least 5000 milliseconds (5 seconds)
      panelClass: [panelClass],
    });
  }
}
