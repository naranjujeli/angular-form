import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate {
  [s: string]: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  notFernandez( control: FormControl ): ErrorValidate {
    if (control.value?.toLowerCase() === "fernandez") {
      return {
        "noFernandez": true
      }
    }
    return null // Esto anda así, cosas de ng
  }

  usernameExists( control: FormControl ): Promise<ErrorValidate> | Observable<ErrorValidate> {
    if (!control.value) {
      return Promise.resolve(null);
    }
    
    return new Promise( (resolve, reject) => {
      setTimeout(() => {
        
        if (control.value === "luca") {
          resolve({ "itActuallyExists": true });
        } else {
          resolve( null );
        }

      }, 1000);
    })
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
