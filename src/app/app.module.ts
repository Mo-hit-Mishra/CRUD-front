import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NewUserComponent } from './pages/new-user/new-user.component';
import { AuthGuard } from './gaurds/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationFormComponent } from './pages/registration-form/registration-form.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import ResetPasswordComponent from './reset-password/reset-password.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';




@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    ForgetPasswordComponent,
    NotFoundComponent,
    NewUserComponent,
    RegistrationFormComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    BrowserAnimationsModule, 
     RouterModule, CommonModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
