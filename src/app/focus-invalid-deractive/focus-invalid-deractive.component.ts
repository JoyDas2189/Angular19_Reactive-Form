import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-focus-invalid-deractive',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './focus-invalid-deractive.component.html',
  styleUrl: './focus-invalid-deractive.component.scss'
})
export class FocusInvalidDeractiveComponent {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { validator: this.passwordsMatch });
  }

  passwordsMatch(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log('Form Submitted Successfully:', this.registrationForm.value);
    }
  }
}
