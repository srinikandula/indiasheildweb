import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DataService } from '../data.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  closeResult = '';
  addresource: FormGroup;
  submitted = false;


  constructor(private formBuilder: FormBuilder, private dataService: DataService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.addresource = this.formBuilder.group({
      name: ['', [Validators.required]],
      contactNumber: ['', [Validators.required, Validators.minLength(10),Validators.pattern('^[6789]+[0-9]{9}$')]],
      resource: ['', [Validators.required]],
      resourcename:[''],
      address:[''],
      city:['', [Validators.required]],
      state:['', [Validators.required]],
      comments:[''],
      createdBy:[localStorage.getItem('name')],
      updatedBy:[localStorage.getItem('name')]
    });
  }

  get f1() { return this.addresource.controls; }

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


  addResource(content) {
    this.modalService.open(content,{
      size: 'lg'
    }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  onSubmit(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.addresource.invalid) {
        return;
    }else{
      this.dataService.addresource(this.addresource.value).subscribe((data:any)=>{
        if(data.success == true){
          Swal.fire('Success!','Resource Added Successfully !', 'success');
          window.location.reload();
        }
        },
        error =>{ 
          console.log(error);
          Swal.fire('Error!','Resource Not Added!', 'error');
        });
    }
  }

}
