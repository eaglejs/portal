import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  test = {};
  model = {
    username: '',
    password: '',
  };

  constructor (
    //private userService: UserService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.listenToTestCall();
  }

  // login(event): Observable<User> {
  //   event.preventDefault();

  // }

  listenToTestCall(): void {
    this.getTestCall().subscribe(test => this.test = test);
  }

  getTestCall(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/test');
  }
}
