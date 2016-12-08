import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'wjc-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  form: FormGroup;

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.pattern('[\\d\\w\\.]+')
      ]),
      firstName: new FormControl('',[
        Validators.required,
        Validators.pattern('[\\w]')
      ]),
      lastName: new FormControl('',[
        Validators.required,
        Validators.pattern('[\\w]')
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });
  }

}
