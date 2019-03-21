import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFormControl: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.loginFormControl = this.formBuilder.group({
      password: ['', [Validators.required]],
      username: ['', [Validators.required]]
    });
  }

  getErrorMessage() {
    return this.loginFormControl.get('username').hasError('required')
      ? 'You must enter a value'
      : this.loginFormControl.get('password').hasError('required')
      ? 'You must enter a value'
      : '';
  }
}
