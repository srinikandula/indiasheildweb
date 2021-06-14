import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  username;
  form:any ='';
  signup1: FormGroup;
  signup2: FormGroup;
  submitted = false;
  submitted2 = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.username = '+' + 91 + localStorage.getItem('username');

    this.signup1 = this.formBuilder.group({
      signuptype: ['', [Validators.required]],
      typeofindividual:['', [Validators.required]],
      vaccination:['', [Validators.required]],
      aadharnumber:['', [Validators.required]],
      cowinnumber:['', [Validators.required]],
      members:['']
    });

    this.signup2 = this.formBuilder.group({
      fullname: ['', [Validators.required]],
      phonenumber:['', [Validators.required]],
      email:['', [Validators.required]],
      state:['', [Validators.required]],
      city:['', [Validators.required]],
      pincode:['', [Validators.required]],
      description:['', [Validators.required]]
    });

  this.signup1.get('signuptype').valueChanges.subscribe(val => {
    if(val === 'Group'){
      this.signup1.controls['members'].setValidators([Validators.required]);
      this.signup1.controls['typeofindividual'].setValue('');
      this.signup1.controls['vaccination'].setValue('');
      this.signup1.controls['aadharnumber'].setValue('');
      this.signup1.controls['cowinnumber'].setValue('');
    }else{
      this.signup1.controls['members'].clearValidators();
      this.signup1.controls['members'].setValue('');
    }
  })
  }

  get f() { return this.signup1.controls; }

  get f1() { return this.signup2.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signup1.invalid) {
        return;
    }
    else{
      console.log(this.signup1.value);
      let role;
      if(this.form == 1){
        role = 'Vaccination';
      }else if(this.form == 2){
        role = 'Volunteer';
      }else if(this.form == 3){
        role = 'HelpSeeker';
      }else if(this.form == 4){
        role = 'Supplier';
      }
      this.dataService.signup(this.signup1.value,role,localStorage.getItem('username')).subscribe((data:any)=>{
        if(data.success == true){
          localStorage.setItem('signup',data.data[0].signup);
          // document.getElementById("sendotp").classList.add("d-none");
          // document.getElementById("otp").classList.remove("d-none");
          // document.getElementById("submit").classList.remove("d-none");
          // Swal.fire('Success!',data.message, 'success');
          // localStorage.setItem('token',data.token);
          // localStorage.setItem('username',this.loginform.value.phoneNumber);
          // setTimeout(()=>{
          //   localStorage.removeItem('token');
          // },3.6e+6);
          // localStorage.setItem('id',data.userId);
          this.router.navigate(['/']);
        }
        },
        error =>{ 
          console.log(error);
          // if(error.error.success == false){
          //   Swal.fire('Fail!',error.error.message, 'error');
          // }
        });
    }
  }

  onSubmit2() {
    this.submitted2 = true;

    // stop here if form is invalid
    if (this.signup2.invalid) {
        return;
    }
    else{
      console.log(this.signup2.value);
      // this.dataService.sendotp(this.loginform.value.phoneNumber).subscribe((data:any)=>{
      //   if(data.success == true){
      //     document.getElementById("number").disabled =true;
      //     document.getElementById("sendotp").classList.add("d-none");
      //     document.getElementById("otp").classList.remove("d-none");
      //     document.getElementById("submit").classList.remove("d-none");
      //     // Swal.fire('Success!',data.message, 'success');
      //     // localStorage.setItem('token',data.token);
      //     // localStorage.setItem('username',this.loginform.value.phoneNumber);
      //     // setTimeout(()=>{
      //     //   localStorage.removeItem('token');
      //     // },3.6e+6);
      //     // localStorage.setItem('id',data.userId);
      //     // this.router.navigate(['/fareconfig']);
      //   }
      //   },
      //   error =>{ 
      //     console.log(error);
      //     if(error.error.success == false){
      //       Swal.fire('Fail!',error.error.message, 'error');
      //     }
      //   });
    }
  }

}
