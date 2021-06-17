import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse,HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private router: Router,
    private http: HttpClient,private activatedRoute: ActivatedRoute) { }

  basePath2 = "http://localhost:5000/api/v1/";
  a = window.location.hostname;
  basePath = this.a == "localhost" ? this.basePath2 : environment.basePath;
  // basePath = environment.basePath
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  // getstate(){
  //   return this.http.get<[]>(this.basePath + 'state',{
  //     headers:{['Content-Type']: 'application/json'},
  //   });
  // }

  // getcity(){
  //   return this.http.get<[]>(this.basePath + 'city',{
  //     headers:{['Content-Type']: 'application/json'},
  //   });
  // }


  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  getresource(query){
    let url;
    if(localStorage.getItem('token')){
      url = 'resourcesbylogin';
    }else{
      url = 'resources';
    }
    if(JSON.stringify(query) != '{}'){
      if(query.city && !query.resource){
        return this.http.get<[]>(this.basePath + url + '?city=' + query.city,{
          headers:{['Content-Type']: 'application/json'},
        });
      }else if(!query.city && query.resource){
        if(query.resource === 'Remdesivir'){
          return this.http.get<[]>(this.basePath + url + '?resourceName=' + query.resource,{
            headers:{['Content-Type']: 'application/json'},
          });
        }else{
          return this.http.get<[]>(this.basePath + url + '?resource=' + query.resource,{
            headers:{['Content-Type']: 'application/json'},
          });
        }
      }else{
        if(query.resource === 'Remdesivir'){
          return this.http.get<[]>(this.basePath + url + '?city=' + query.city + '&resourceName=' + query.resource,{
            headers:{['Content-Type']: 'application/json'},
          });
        }else{
          return this.http.get<[]>(this.basePath + url + '?city=' + query.city + '&resource=' + query.resource,{
            headers:{['Content-Type']: 'application/json'},
          });
        }
      }
  }
  }

  // refreshdata(){
  //   return this.http.get<[]>(this.basePath + 'refreshdata' + '?username=' + localStorage.getItem('username'),{
  //     headers:{['Content-Type']: 'application/json'},
  //   });
  // }

  // getslabs(){
  //   return this.http.get<[]>(this.basePath + 'getslabs',{
  //     headers:{['Content-Type']: 'application/json'},
  //   });
  // }

  // getlogs(){
  //   return this.http.get<[]>(this.basePath + 'getlogs',{
  //     headers:{['Content-Type']: 'application/json'},
  //   });
  // }

  // addconfig(source,destination,distance,slab){
  //   return this.http.post<[]>(this.basePath + 'fareconfig',[{"sourcecity":source,"destinationcity":destination,"distance":distance,"slab":slab,"username":localStorage.getItem('username')}],this.httpOptions);
  // }

  // updateconfig(id,slab, nacseater, nacsleeper, acseater, acsleeper, multiseater,multisleeper,distance,recalculate){
  //     return this.http.put<[]>(this.basePath + 'fareconfig/' + id, {"slab":slab,"distance":distance,"NON_AC_SEATER":nacseater, "AC_SEATER": acseater, "NON_AC_SLEEPER":nacsleeper, "AC_SLEEPER": acsleeper,"MULTI_SEATER": multiseater, "MULTI_SLEEPER": multisleeper,"recalculate":recalculate,"username":localStorage.getItem('username')},this.httpOptions);
  //   }

  // addslabs(type,priceperkm,slab){
  //   return this.http.post<[]>(this.basePath + 'rateconfig',{"type":type,"pricePerKM":priceperkm,"slab":slab,"username":localStorage.getItem('username')},this.httpOptions);
  // }

  // editslabs(id,price){
  //   return this.http.put<[]>(this.basePath + 'rateconfig/' + id, {"pricePerKM":price,"username":localStorage.getItem('username')},this.httpOptions);
  // }



  // getconfig2(){
  //   let queryString = window.location.search;
  //   // console.log(window.location.search);
  //   const urlParams = new URLSearchParams(queryString);
  //   const product = urlParams.get('sourcecity')
  //   // console.log(product); 
  //   // console.log(href.split(href,10));
  //   return this.http.get<[]>(this.basePath + 'farelist',{
  //     headers:{['Content-Type']: 'application/json'},
  //   });
  // }

  // getrateconfig(){
  //   return this.http.get<[]>(this.basePath + 'rateconfig',{
  //     headers:{['Content-Type']: 'application/json'},
  //   });
  // }

  // getuser(mobile, password){
  //   return this.http.post<[]>(this.basePath + 'getuser', {"phonenumber":mobile,"password":password},this.httpOptions);
  // }

  sendotp(mobile){
    return this.http.post<[]>(this.basePath + 'sendotp', {"phonenumber":mobile},this.httpOptions);
  }

  verify(mobile,otp){
    return this.http.post<[]>(this.basePath + "verifyotp", {"phonenumber":mobile, "otp": otp},this.httpOptions);
  }

  verifyresource(id,name,date){
    return this.http.put<[]>(this.basePath + "resourcesbylogin", {"id":id, "verifyby" : name, "date" : date},this.httpOptions);
  }

  signup(signup,role,mobile){
    return this.http.put<[]>(this.basePath + "user", {"formdata":signup, "role": role, "phonenumber": mobile},this.httpOptions);
  }
}
