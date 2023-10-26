import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html'
})
export class ReactiveComponent implements OnInit {
  form: FormGroup;
  
  constructor(private formBuilder: FormBuilder) {
    this.initializeForm();
  }
  
  ngOnInit(): void {

  }

  initializeForm() {
    this.form = this.formBuilder.group({
      // [valorDefault, validadorSíncrono, validadorAsíncrono]
      name: ["Don't you worry", [ Validators.required, Validators.minLength(5) ]],
      lastName: ["Don't you worry", Validators.required],
      // email: ['chiii@ii.ild', Validators.email]
      email: ['chiii@ii.ild', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9-]+[.]+[a-z]{2,3}$') ]]
    });
  }

  nameNotValid() {
    return this.form.get('name').invalid && this.form.get('name').touched;
  }

  lastNameNotValid() {
    return this.form.get('lastName').invalid && this.form.get('lastName').touched;
  }

  emailNotValid() {
    return this.form.get('email').invalid && this.form.get('email').touched;
  }
  
  save() {
    console.log(this.form);

    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
}
