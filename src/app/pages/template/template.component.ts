import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html'
})
export class TemplateComponent implements OnInit {
  user = {
    name: "Ramiro",
    lastName: "Saracatunga",
    email: "rsaracatunga@hotairballoon.com",
    country: "ARG",
    gender: "male"
  }
  countries: any[] = [];

  constructor(private countriesService: CountriesService) {

  }

  ngOnInit(): void {
    this.countriesService.getCountries()
      .subscribe( (data: any[]) => {
        console.log(data);
        this.countries = data;
        this.countries.unshift({
          name: '[ Seleccione País ]',
          code: ''
        })
      });
  }

  save( form: NgForm ) {
    if (form.invalid) {
      Object.values(form.controls).forEach( control => {
        control.markAsTouched();
      });
    } else {
      this.user = form.form.value;
    }

    console.log(form.form.value);
    console.log(this.user);
  }
}
