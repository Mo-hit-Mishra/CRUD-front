import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: false,
  templateUrl: './reset-password.component.html',

})
export default class ResetPasswordComponent implements OnInit {
  fb = inject(FormBuilder);
  activatedRoute = inject(ActivatedRoute);
  authService = inject(AuthService);
  router = inject(Router);

  resetForm!: FormGroup;


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((val) => {
      // this.token = val['token'];
      // console.log(this.token);
    });
    this.resetForm = this.fb.group(
      {
        email: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      }
    );
  }
  reset() {
    const resetObj = {
      email: this.resetForm.value.email,
      password: this.resetForm.value.password
    }
    console.log(resetObj);
    
    this.authService.handleResetPassword(resetObj).subscribe({
      next:(res)=>{
        alert(res.message);
        this.resetForm.reset();
        this.router.navigate(['login']);
      },
      error: (err) => {
        alert(err.error.message);
        console.log(err);
      }
    });
    
  }
}