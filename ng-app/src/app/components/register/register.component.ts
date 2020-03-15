import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerFormControl: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.registerFormControl = this.formBuilder.group({
      confirmPassword: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
      username: ['', [Validators.required]]
    });
  }

  getErrorMessage() {
    return this.registerFormControl.get('email').hasError('required')
      ? 'You must enter a value'
      : this.registerFormControl.get('email').hasError('email')
      ? 'Not a valid email'
      : '';
  }

  register() {
    this.authService.register(this.registerFormControl.getRawValue()).subscribe(data => {
      console.log(data);
    });
  }
}
