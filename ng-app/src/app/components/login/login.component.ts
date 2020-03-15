import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFormControl: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

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

  login($event): void {
    this.authService.login(this.loginFormControl.getRawValue()).subscribe(data => {
      console.log(data);
    });
  }
}
