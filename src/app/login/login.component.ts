import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private dataService: DataService) { }
  loginform: FormGroup;
  submitted = false;
  formvalue;
  otp;

  ngOnInit(): void {
    this.loginform = this.formBuilder.group({
      phoneNumber: ['', [Validators.required, Validators.minLength(10),Validators.pattern('^[6789]+[0-9]{9}$')]],
  }); 
  // if(localStorage.getItem('access_token')!= null){
  //   this.router.navigate(['/orders']);
  // }
  }

  get f() { return this.loginform.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginform.invalid) {
        return;
    }
    else{
      this.dataService.sendotp(this.loginform.value.phoneNumber).subscribe((data:any)=>{
        if(data.success == true){
          document.getElementById("number").disabled =true;
          document.getElementById("sendotp").classList.add("d-none");
          document.getElementById("otp").classList.remove("d-none");
          document.getElementById("submit").classList.remove("d-none");
          // Swal.fire('Success!',data.message, 'success');
          // localStorage.setItem('token',data.token);
          // localStorage.setItem('username',this.loginform.value.phoneNumber);
          // setTimeout(()=>{
          //   localStorage.removeItem('token');
          // },3.6e+6);
          // localStorage.setItem('id',data.userId);
          // this.router.navigate(['/fareconfig']);
        }
        },
        error =>{ 
          console.log(error);
          if(error.error.success == false){
            Swal.fire('Fail!',error.error.message, 'error');
          }
        });
    }
    // if(this.loginform.value.phoneNumber === '9876543210' && this.loginform.value.password === '123456'){
    //   localStorage.setItem('access_token2','abc');
    //   this.router.navigate(['/fareconfig']);
    // }
    // else{
    //   console.log('Error')
    // }

    // this.formvalue = JSON.stringify(this.loginform.value);
    // this.authService.login(this.formvalue).subscribe((data:any)=>{
    //   localStorage.setItem('access_token',data.accessToken);
    //   localStorage.setItem('name',data.fullName);
    //   this.router.navigate(['/orders']);
    // },
    // error =>{
    //   document.getElementById("error").classList.remove("d-none");
    //   document.getElementById("error").innerHTML= error.error.message;
    // });
    // console.log(this.loginform.value)
  }

  verifyOTP(){
    this.dataService.verify(this.loginform.value.phoneNumber,this.otp).subscribe((data:any)=>{
      if(data.success == true && data.signup === true){
        localStorage.setItem('token',data.token);
        localStorage.setItem('username',data.number);
        localStorage.setItem('signup',data.signup);
        localStorage.setItem('name',data.data[0].name);
        localStorage.setItem('role',data.data[0].role);
        // setTimeout(()=>{
        //   localStorage.removeItem('token');
        // },3.6e+6);
        // localStorage.setItem('id',data.userId);
        this.router.navigate(['/']);
      }else if(data.success == true && data.signup === false){
        localStorage.setItem('token',data.token);
        localStorage.setItem('username',data.number);
        localStorage.setItem('signup',data.signup);
        // window.location.reload();
        this.router.navigate(['/signup']);
      }
      },
      error =>{ 
        console.log(error);
        if(error.error.success == false){
          Swal.fire('Fail!',error.error.message, 'error');
        }
      });
  }

}
