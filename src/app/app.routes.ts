import { Routes } from '@angular/router';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { PasswordStrengthCheckerComponent } from './password-strength-checker/password-strength-checker.component';

export const routes: Routes = [
    { path: '', redirectTo: '/employee-form', pathMatch: 'full' },
    { path: 'employee-form', component: EmployeeFormComponent },
    { path: '**', redirectTo: '/employee-form' },
    { path: 'password-strength', component: PasswordStrengthCheckerComponent}
];
