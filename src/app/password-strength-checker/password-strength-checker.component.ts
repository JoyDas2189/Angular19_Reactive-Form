import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-strength-checker',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './password-strength-checker.component.html',
  styleUrl: './password-strength-checker.component.scss'
})
export class PasswordStrengthCheckerComponent {
  passwordForm: FormGroup;
  formSubmitted = false;

  constructor(private fb: FormBuilder) {
    this.passwordForm = this.fb.group(
      {
        username: ['', Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            this.passwordStrengthValidator,
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatching }
    );
  }

  get password() {
    return this.passwordForm.get('password');
  }
  get confirmPassword() {
    return this.passwordForm.get('confirmPassword');
  }


  passwordMatching(control: FormGroup) {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ mustMatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }

  passwordStrengthValidator(control: any) {
    const password = control.value;
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (password && !regex.test(password)) {
      return { strength: true };
    } 
    return null;
  }
  

  onSubmit() {
    this.formSubmitted = true;
    if (this.passwordForm.valid) {
      console.log('Form submitted successfully');
      console.log(this.passwordForm.value);
      this.passwordForm.reset()
      
    }
  }
}
