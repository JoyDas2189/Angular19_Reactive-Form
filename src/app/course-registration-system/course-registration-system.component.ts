import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Observable, of, delay, map } from 'rxjs';

@Component({
  selector: 'app-course-registration-system',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './course-registration-system.component.html',
  styleUrl: './course-registration-system.component.scss'
})
export class CourseRegistrationSystemComponent {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      studentName: ['', Validators.required],
      studentEmail: ['', [Validators.required, Validators.email], [this.asyncEmailValidator]],
      courses: this.fb.array([], [this.validateCourseList]),
      paymentDetails: this.fb.group({
        cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
        expiryDate: ['', Validators.required],
      }),
    });
  }

  get courses(): FormArray {
    return this.registrationForm.get('courses') as FormArray;
  }

  addCourse() {
    this.courses.push(this.fb.control('', Validators.required));
  }

  removeCourse(index: number) {
    this.courses.removeAt(index);
  }

  validateCourseList(control: AbstractControl): ValidationErrors | null {
    const courses = control as FormArray;
    return courses.length > 0 ? null : { noCoursesSelected: true };
  }

  asyncEmailValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    const takenEmails = ['joy@gmail.com', 'example@gmail.com'];
    return of(takenEmails.includes(control.value)).pipe(
      delay(1000),
      map((isTaken) => (isTaken ? { emailTaken: true } : null))
    );
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log('Form Submitted:', this.registrationForm.value); 
      this.registrationForm.reset()
    }
  }
}
