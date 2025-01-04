import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PasswordStrengthCheckerComponent } from "./password-strength-checker/password-strength-checker.component";
import { EmployeeFormComponent } from './employee-form/employee-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, EmployeeFormComponent ,PasswordStrengthCheckerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular19_Reactive-Form';
}
