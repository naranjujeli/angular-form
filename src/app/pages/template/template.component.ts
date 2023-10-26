import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  user = {
    name: "",
    lastName: "",
    email: ""
  }

  constructor() {

  }

  ngOnInit(): void {

  }

  save( form: NgForm ) {
    console.log(form);

    if (form.invalid) {
      Object.values(form.controls).forEach( control => {
        control.markAsTouched();
      });
    }
  }
}
