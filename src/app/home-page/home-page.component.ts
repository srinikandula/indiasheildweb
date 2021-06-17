import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  city;
  resource;
  leads;
  size;
  error;
  role = localStorage.getItem('role');


  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  search(){
    if(!this.city && !this.resource){
      this.size = 0;
      this.error = 'Please Enter City Name Or Resource';
    }else{
      this.error = '';
    }
    if(!this.city){
      this.resource = this.capitalFirst(this.resource);
      let query = {"resource": this.resource};
      this.dataService.getresource(query).subscribe((data:any)=>{
        this.leads = data.data;
        this.size = data.count;
        },
        error =>{
          console.log(error);
      });

    }else if(!this.resource){
      this.city = this.capitalFirst(this.city);
      let query = {"city": this.city};
      this.dataService.getresource(query).subscribe((data:any)=>{
        this.leads = data.data;
        this.size = data.count;
        },
        error =>{
          console.log(error);
      });

    }else{
      this.city = this.capitalFirst(this.city);
      this.resource = this.capitalFirst(this.resource);
      let query = {"city": this.city, "resource": this.resource};

      this.dataService.getresource(query).subscribe((data:any)=>{
        this.leads = data.data;
        this.size = data.count;
        },
        error =>{
          console.log(error);
      });
    }

  }


  capitalFirst(value:string): string {
    let first = value.substr(0,1).toUpperCase();
    return first + value.substr(1); 
  }


  verify(id){
    Swal.fire({
      title: 'Are You Sure',
      showCancelButton: true,
      confirmButtonText: `Yes`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        let date = new Date();
        this.dataService.verifyresource(id,localStorage.getItem('name'),date).subscribe((data:any)=>{
          Swal.fire('Verified!', '', 'success');
          this.search();
          },
          error =>{
            console.log(error);
        });
      }
    })
  }


}
