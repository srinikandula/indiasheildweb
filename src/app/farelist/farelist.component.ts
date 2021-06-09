import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-farelist',
  templateUrl: './farelist.component.html',
  styleUrls: ['./farelist.component.css']
})
export class FarelistComponent implements OnInit {
  term;
  config$;
  source = "select";
  public isActive: any;
  // page = 1;
  // pageSize = 10;
  fileName= 'Farelist.xlsx'; 
  size;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getconfig2().subscribe((data:any)=>{
      this.config$ = (data.data);
      // console.log(this.city$);
      this.size = this.config$.length;
      },
      error =>{
        console.log(error);
      });
   
  }

  exportexcel(): void 
    {
       /* table id is passed over here */   
       let element = document.getElementById('excel-table'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);
			
    }

}
