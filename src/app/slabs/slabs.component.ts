import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../data.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-slabs',
  templateUrl: './slabs.component.html',
  styleUrls: ['./slabs.component.css']
})
export class SlabsComponent implements OnInit {

  constructor(private dataService: DataService, private modalService: NgbModal) { }
  config$;
  term;
  page = 1;
  pageSize = 10;
  size;
  public isActive: any;
  ngOnInit(): void {

    this.dataService.getrateconfig().subscribe((data:any)=>{
      this.config$ = (data.data);
      // console.log(this.city$);
      this.size = data.count;
      },
      error =>{
        console.log(error);
      });
  }


  openSmall1(content){
    this.modalService.open(content, {
      size: 'sm'
    })
    this.slab = '';
    this.type = '';
    this.pricePerKM = '';
  }
id;
  openSmall2(content,data){
    this.modalService.open(content, {
      size: 'sm'
    })
    this.slab = data.slab;
    this.type = data.type;
    this.pricePerKM = data.pricePerKM;
    this.id =data._id;
  }

  type;
  pricePerKM;
  slab;
  addslabs(){
    this.dataService.addslabs(this.type,this.pricePerKM,this.slab).subscribe((data:any)=>{
      if(data.success == true){
      Swal.fire('Success','Slab Added Successfully !','success');
      this.modalService.dismissAll();
      this.ngOnInit();
      }
      },
      error =>{
        if(error.error.message === 'Failed'){
          this.dataService.logout();
        }
        console.log(error.error.message);
        Swal.fire('Error',error.error.error,'error');
      });
  }

  editslabs(){
    this.dataService.editslabs(this.id,this.pricePerKM).subscribe((data:any)=>{
      if(data.success == true){
      Swal.fire('Success','Slab Edited Successfully !','success');
      this.modalService.dismissAll();
      this.ngOnInit();
      }
      },
      error =>{
        if(error.error.message === 'Failed'){
          this.dataService.logout();
        }
        console.log(error.error.message);
        Swal.fire('Error',error.error.error,'error');
      });
  }
}
