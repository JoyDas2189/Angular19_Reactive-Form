import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})
export class EmployeeFormComponent {
  employeeForm: FormGroup;
  departments = [
    { id: 1, name: 'HR' },
    { id: 2, name: 'IT' },
    { id: 3, name: 'Finance' },
    { id: 4, name: 'Support'}
  ];

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      department: ['', Validators.required],
      joiningDate: ['', Validators.required],
      skills: this.fb.array([])
    });
  }

  get skills(): FormArray {
    return this.employeeForm.get('skills') as FormArray;
  }

  addAssignment(): void {
    const skillGroup = this.fb.group({
      skillsName: ['', Validators.required],
    });
    this.skills.push(skillGroup);
  }

  removeAssignment(index: number): void {
    this.skills.removeAt(index);
  }

  onSubmit(): void {
    console.log(this.employeeForm.value);
    this.employeeForm.reset();
    this.employeeForm.setControl('skills', this.fb.array([]));
    this.employeeForm.get('department')?.setValue('');
  }
}

