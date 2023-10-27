import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import { ValidatorsService } from 'src/app/services/validators.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html'
})
export class ReactiveComponent implements OnInit {
  form: FormGroup;
  
  constructor(private formBuilder: FormBuilder,
              private fernandezValidators: ValidatorsService) {
    this.initializeForm();
    this.loadDataToForm();
  }
  
  ngOnInit(): void {

  }

  initializeForm() {
    this.form = this.formBuilder.group({
      // [valorDefault, validadorSíncrono, validadorAsíncrono]
      name: ["", [ Validators.required, Validators.minLength(5) ]],
      lastName: ["", [Validators.required, this.fernandezValidators.notFernandez]],
      // email: ['', Validators.email]
      email: ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9-]+[.]+[a-z]{2,3}$') ]],
      password1: ["", [ Validators.required, Validators.minLength(6) ]],
      password2: ["", [ Validators.required ]],
      address: this.formBuilder.group({
        district: ['', Validators.required],
        city: ['', Validators.required]
      }),
      hobbies: this.formBuilder.array([
        [],
        [],
        [],
        [],
        []
      ])
    },{
      validators: this.fernandezValidators.equalPasswords("password1", "password2")
    });
  }

  loadDataToForm() {
    /**
     * Es distinto usar reset de usar setValue, ya que setValue
     * exije tener valores para todos los campos, mientras que
     * reset da por sentado que algunos pueden quedar vacíos.
     */
    this.form.reset({
      name: 'Hello',
      lastName: "It's me you're looking for",
      email: 'icanseeit@inyour.eyes'
    })
  }

  addHobby() {
    // this.hobbies.push( this.formBuilder.control('Nuevo hobby', Validators.required) );
    this.hobbies.push( this.formBuilder.control('') );
  }

  deleteHobby(i: number) {
    this.hobbies.removeAt(i);
  }

  get hobbies() {
    return this.form.get('hobbies') as FormArray;
  }

  get nameNotValid() {
    return this.form.get('name').invalid && this.form.get('name').touched;
  }

  get lastNameNotValid() {
    return this.form.get('lastName').invalid && this.form.get('lastName').touched;
  }

  get emailNotValid() {
    return this.form.get('email').invalid && this.form.get('email').touched;
  }

  get districtNotValid() {
    return this.form.get('address.district').invalid && this.form.get('address.district').touched;
  }

  get cityNotValid() {
    return this.form.get('address.city').invalid && this.form.get('address.city').touched;
  }

  get password1NotValid() {
    return this.form.get('password1').invalid && this.form.get('password1').touched;
  }

  get password2NotValid() {
    const firstPass = this.form.get('password1').value;
    const secondPass = this.form.get('password2').value;
    const passwordsMatch = firstPass===secondPass;
    return (!passwordsMatch || this.form.get('password2').invalid) && this.form.get('password2').touched;
  }
  
  // recursividad al palo
  saveFormGroup( formGroup?: any) {
    if (this.form.invalid) {
      if (!formGroup) {
        formGroup = this.form.controls;
      }
      Object.values(formGroup).forEach((control: AbstractControl) => {
        console.log(control);
        if (control instanceof FormGroup) {
          this.saveFormGroup(control.controls);
        } else {
          control.markAsTouched();
        }
      });
    }
  }
}
