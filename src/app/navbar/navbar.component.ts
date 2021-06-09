import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import { DataService } from '../data.service';
import { ViewChild, ElementRef} from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  state$;
state = "select";
city$;
city;
editcity;
editstate;

@ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;
  constructor(private dataService: DataService, private toast: ToastrService, private router: Router) { }

  

  ngOnInit(): void {
  
      // Toggle Click Function
    $("#menu-toggle").click(function(e) {
  e.preventDefault();
  $("#wrapper").toggleClass("toggled");
  });

    

    // this.dataService.getstate().subscribe((data:any)=>{
    //   this.state$ = (data.data);
    //   // console.log(this.state$);
    //   },
    //   error =>{
    //     console.log(error);
    //   });

    //   this.dataService.getcity().subscribe((data:any)=>{
    //     this.city$ = (data.data);
    //     // console.log(this.city$);
    //     },
    //     error =>{
    //       console.log(error);
    //     });
    // });
  }



// edit(city,state){
//   this.editcity = city;
//   this.editstate = state;
// }

//   states(state){
//     // console.log(state);
//   }

  logout() {
   this.dataService.logout();
  }

}
