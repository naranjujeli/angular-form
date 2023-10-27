import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  notFernandez( control: FormControl ): { [s: string]: boolean } {
    if (control.value?.toLowerCase() === "fernandez") {
      return {
        "noFernandez": true
      }
    }
    return null // Esto anda así, cosas de ng
  }

  equalPasswords( password1Key: string, password2Key: string) {

    return ( formGroup: FormGroup ) => {
      const password1Control = formGroup.controls[password1Key];
      const password2Control = formGroup.controls[password2Key];
      if (password1Control.value === password2Control.value) {
        password2Control.setErrors(null);
      } else {
        password2Control.setErrors({ notEqual: true });
      }
    }

  }
}
