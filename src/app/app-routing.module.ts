import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NewUserComponent } from './pages/new-user/new-user.component';
import { AdminModule } from './modules/admin/admin.module';
import { AuthGuard } from './gaurds/auth.guard'
import ResetPasswordComponent from './reset-password/reset-password.component';



const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'new-user', component: NewUserComponent},
  {path:'forget-password', component: ForgetPasswordComponent},
  {path:'reset-password/:token', component: ResetPasswordComponent},
  // this is use for website make fast
  {path:'', redirectTo: '/login', pathMatch: 'full'},
  {
    path: 'admin',
    canActivate:[AuthGuard],
  loadChildren: () => 
    import('./modules/admin/admin.module').then((m) => m.AdminModule)
  },
  {path:'**', component: NotFoundComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
