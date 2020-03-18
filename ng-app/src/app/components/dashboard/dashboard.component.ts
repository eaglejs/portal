import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private httpService: HttpService) { }

  ngOnInit() {
  }

  toggleGarageDoor(): void {
    this.httpService.toggleGarageDoor().subscribe(data => {
      console.log(data);
    });
  }

}
