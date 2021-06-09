import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../data.service';
import Swal from 'sweetalert2'

// import { format } from 'path';

@Component({
  selector: 'app-fareconfig',
  templateUrl: './fareconfig.component.html',
  styleUrls: ['./fareconfig.component.css']
})
export class FareconfigComponent implements OnInit {

  term;
  config$;
  destination;
  source;
  distance;
  slab = "default";
  nacseater;
  acseater;
  nacsleeper;
  acsleeper;
  multiseater;
  multisleeper;
  slabs:any=[];
  page = 1;
  pageSize = 10;
  size;
  recalculate = false;
  public isActive: any;

  constructor(private dataService: DataService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.dataService.getconfig({}).subscribe((data:any)=>{
      this.config$ = (data.data);
      this.size = data.count;
    },
    error =>{
      console.log(error);
    });

    this.dataService.getslabs().subscribe((data:any)=>{

      for(let a of data.data){
        this.slabs.push(a.slab);
        this.slabs = Array.from(new Set(this.slabs ));
      }
    },
    error =>{
      console.log(error);
    });
  }

  removeduplicates(data){
    let unique = [];
    for(let element of data){
    // data.forEach(element => {
      if(!unique.includes(element.slab)){
        console.log(element);
        unique.push(element);
      }
    // })
  }
    return unique;
  }

  openSmall1(content){
    this.modalService.open(content, {
      size: 'sm'
    })
    this.slab = 'default';
    this.source = '';
    this.destination = '';
    this.distance = null;
  }
  id;
  copydata:any={};
  openSmall2(content,data){
    this.modalService.open(content, {
      size: 'xl',
    })
    this.copydata = data;
    this.slab = data.slab;
    this.nacseater = data.NON_AC_SEATER;
    this.acseater = data.AC_SEATER;
    this.nacsleeper = data.NON_AC_SLEEPER;
    this.acsleeper = data.AC_SLEEPER;
    this.multiseater = data.MULTI_SEATER;
    this.multisleeper = data.MULTI_SLEEPER;
    this.source = data.sourcecity;
    this.destination = data.destinationcity;
    this.distance = data.distance;
    this.recalculate = data.recalculate;
    this.id = data._id;
  }

  close(){
    this.modalService.dismissAll();
    this.recalculate =  false;
  }
  update(){
    if(this.recalculate == true){
    this.dataService.getconfig({"recalculate": this.recalculate}).subscribe((data:any)=>{
      this.config$ = (data.data);
      this.size = data.count;
      },
      error =>{
        console.log(error);
      });
    }
    else{
      this.dataService.getconfig({}).subscribe((data:any)=>{
        this.config$ = (data.data);
        this.size = data.count;
        },
        error =>{
          console.log(error);
        });
    } 
  }
  sourcecity(data){
    // this.dataService.getconfig().subscribe((data:any)=>{
    //   this.config$ = (data.data);
    //   // console.log(this.city$);
    //   },
    //   error =>{
    //     console.log(error);
    //   });
    console.log(data);
  }

  addroutes(){
    this.dataService.addconfig(this.source,this.destination,this.distance,this.slab).subscribe((data:any)=>{
      if(data.success == true){
      Swal.fire('Success','Route Added Successfully !','success');
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

  updateroutes(){
    this.dataService.updateconfig(this.id,this.slab,this.nacseater,this.nacsleeper,this.acseater,this.acsleeper,this.multiseater,this.multisleeper,this.distance,this.recalculate).subscribe((data:any)=>{
      if(data.success == true){
      Swal.fire('Success','Route Edited Successfully !','success');
      this.modalService.dismissAll();
      this.ngOnInit();
      this.recalculate = false;
      }
      },
      error =>{
        console.log(error.error.message);
        if(error.error.message === 'Failed'){
          this.dataService.logout();
        }
        console.log(error.error.message);
        Swal.fire('Error',error.error.error,'error');
      });
  }

  change(){
    if(this.recalculate === false){
    this.slab = this.copydata.slab;
    this.nacseater = this.copydata.NON_AC_SEATER;
    this.acseater = this.copydata.AC_SEATER;
    this.nacsleeper = this.copydata.NON_AC_SLEEPER;
    this.acsleeper = this.copydata.AC_SLEEPER;
    this.multiseater = this.copydata.MULTI_SEATER;
    this.multisleeper = this.copydata.MULTI_SLEEPER;
    this.source = this.copydata.sourcecity;
    this.destination = this.copydata.destinationcity;
    this.distance = this.copydata.distance;
    }
  }


  refresh(){
    this.dataService.refreshdata().subscribe((data:any)=>{
      if(data.success == true){
        Swal.fire('Success','Data Refreshed Successfully !','success');
      this.config$ = (data.data);
      this.size = data.count;
      }
      },
      error =>{
        console.log(error);
      });
  }
  

}
