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
      // "Access-Control-Allow-Origin":"*",
      // "Access-Control-Allow-Methods":"POST, GET, OPTIONS, DELETE, PUT",
      // "Access-Control-Max-Age":"1000",
      // "Access-Control-Allow-Headers":"x-requested-with, Content-Type, origin, authorization, accept, client-security-token"
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

  getconfig(query){
    console.log(query);
    if(JSON.stringify(query) != '{}'){
    return this.http.get<[]>(this.basePath + 'fareconfig' + '?recalculate=' + query.recalculate,{
      headers:{['Content-Type']: 'application/json'},
    });
  }
  else{
    return this.http.get<[]>(this.basePath + 'fareconfig',{
      headers:{['Content-Type']: 'application/json'},
    });
  }
  }

  refreshdata(){
    return this.http.get<[]>(this.basePath + 'refreshdata' + '?username=' + localStorage.getItem('username'),{
      headers:{['Content-Type']: 'application/json'},
    });
  }

  getslabs(){
    return this.http.get<[]>(this.basePath + 'getslabs',{
      headers:{['Content-Type']: 'application/json'},
    });
  }

  getlogs(){
    return this.http.get<[]>(this.basePath + 'getlogs',{
      headers:{['Content-Type']: 'application/json'},
    });
  }

  addconfig(source,destination,distance,slab){
    return this.http.post<[]>(this.basePath + 'fareconfig',[{"sourcecity":source,"destinationcity":destination,"distance":distance,"slab":slab,"username":localStorage.getItem('username')}],this.httpOptions);
  }

  updateconfig(id,slab, nacseater, nacsleeper, acseater, acsleeper, multiseater,multisleeper,distance,recalculate){
      return this.http.put<[]>(this.basePath + 'fareconfig/' + id, {"slab":slab,"distance":distance,"NON_AC_SEATER":nacseater, "AC_SEATER": acseater, "NON_AC_SLEEPER":nacsleeper, "AC_SLEEPER": acsleeper,"MULTI_SEATER": multiseater, "MULTI_SLEEPER": multisleeper,"recalculate":recalculate,"username":localStorage.getItem('username')},this.httpOptions);
    }

  addslabs(type,priceperkm,slab){
    return this.http.post<[]>(this.basePath + 'rateconfig',{"type":type,"pricePerKM":priceperkm,"slab":slab,"username":localStorage.getItem('username')},this.httpOptions);
  }

  editslabs(id,price){
    return this.http.put<[]>(this.basePath + 'rateconfig/' + id, {"pricePerKM":price,"username":localStorage.getItem('username')},this.httpOptions);
  }



  getconfig2(){
    let queryString = window.location.search;
    // console.log(window.location.search);
    const urlParams = new URLSearchParams(queryString);
    const product = urlParams.get('sourcecity')
    // console.log(product); 
    // console.log(href.split(href,10));
    return this.http.get<[]>(this.basePath + 'farelist',{
      headers:{['Content-Type']: 'application/json'},
    });
  }

  getrateconfig(){
    return this.http.get<[]>(this.basePath + 'rateconfig',{
      headers:{['Content-Type']: 'application/json'},
    });
  }

  getuser(mobile, password){
    return this.http.post<[]>(this.basePath + 'getuser', {"phonenumber":mobile,"password":password},this.httpOptions);
  }

  // addcity(city, state, redbus, abhibus, bitla, its, ezinfo, mantis){
  //   return this.http.post<[]>(this.basePath + 'city', {"token":localStorage.getItem('token'),"cityname":city,"statename":state,"redbusid":redbus, "abhibusid": abhibus, "bitlaid":bitla, "its": its, "ezinfo": ezinfo, "mantis": mantis,"created_by":localStorage.getItem('id')},this.httpOptions);
  // }

  // updatecity(id,city, state, redbus, abhibus, bitla, its, ezinfo, mantis){
  //   return this.http.put<[]>(this.basePath + 'city/' + id, {"token":localStorage.getItem('token'),"cityname":city,"statename":state,"redbusid":redbus, "abhibusid": abhibus, "bitlaid":bitla, "its": its, "ezinfo": ezinfo, "mantis": mantis,"updated_by":localStorage.getItem('id')},this.httpOptions);
  // }

  // fareconfig(scity, dcity, routename, distance){
  //   return this.http.post<[]>(this.basePath + 'fareconfig', {"token":localStorage.getItem('token'),"sourcecity":scity,"destinationcity":dcity, "routename.routes":routename, "distance":distance, "created_by":localStorage.getItem('id')},this.httpOptions);
  // }
  // addtype(id,rate){
  //   if(localStorage.getItem('bustype') == 'Non AC Seater'){
  //     return this.http.put<[]>(this.basePath + 'fareconfig/' + id, {"token":localStorage.getItem('token'),"nseater":rate,"updated_by":localStorage.getItem('id')},this.httpOptions);
  //   }
  //   if(localStorage.getItem('bustype') == 'AC Seater'){
  //     return this.http.put<[]>(this.basePath + 'fareconfig/' + id, {"token":localStorage.getItem('token'),"aseater":rate,"updated_by":localStorage.getItem('id')},this.httpOptions);
  //   }
  //   if(localStorage.getItem('bustype') == 'Non AC Sleeper Lower'){
  //     return this.http.put<[]>(this.basePath + 'fareconfig/' + id, {"token":localStorage.getItem('token'),"nsleeperl":rate,"updated_by":localStorage.getItem('id')},this.httpOptions);
  //   }
  //   if(localStorage.getItem('bustype') == 'Non AC Sleeper Upper'){
  //     return this.http.put<[]>(this.basePath + 'fareconfig/' + id, {"token":localStorage.getItem('token'),"nsleeperu":rate,"updated_by":localStorage.getItem('id')},this.httpOptions);
  //   }
  //   if(localStorage.getItem('bustype') == 'AC Sleeper Lower'){
  //     return this.http.put<[]>(this.basePath + 'fareconfig/' + id, {"token":localStorage.getItem('token'),"asleeperl":rate,"updated_by":localStorage.getItem('id')},this.httpOptions);
  //   }
  //   if(localStorage.getItem('bustype') == 'AC Sleeper upper'){
  //     return this.http.put<[]>(this.basePath + 'fareconfig/' + id, {"token":localStorage.getItem('token'),"asleeperu":rate,"updated_by":localStorage.getItem('id')},this.httpOptions);
  //   }
   
  // }
}
