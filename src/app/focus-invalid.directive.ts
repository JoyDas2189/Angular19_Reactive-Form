import { Directive, HostListener } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';

@Directive({
  selector: '[appFocusInvalid]',
  standalone: true
})
export class FocusInvalidDirective {

  constructor(private formGroupDirective: FormGroupDirective) {}

  @HostListener('submit') onFormSubmit() {
    const invalidControl = this.findFirstInvalidControl();
    if (invalidControl) {
      invalidControl.focus();
    }
  }

  private findFirstInvalidControl(): HTMLElement | null {
    const controls = this.formGroupDirective.control.controls;

    for (const key in controls) {
      if (controls.hasOwnProperty(key)) {
        const control = controls[key] as FormControl;
        if (control.invalid) {
          const element = document.querySelector(`[formControlName="${key}"]`);
          if (element) {
            return element as HTMLElement;
          }
        }
      }
    }
    return null;
  }
}
