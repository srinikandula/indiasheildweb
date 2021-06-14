import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-navbar-main',
  templateUrl: './navbar-main.component.html',
  styleUrls: ['./navbar-main.component.css']
})
export class NavbarMainComponent implements OnInit {

  token = localStorage.getItem('token');
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  logout(){
    this.dataService.logout();
    this.token = localStorage.getItem('token');
  }

}
