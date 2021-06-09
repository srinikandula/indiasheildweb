import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {


  page = 1;
  pageSize = 100;
  size;
  term;
  config$;

  public isActive: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getlogs().subscribe((data:any)=>{
      this.config$ = (data.data);
      this.size = data.count;
      },
      error =>{
        console.log(error);
      });
  }

}
