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
  basePath = "https://indiashieldapi.whizzard.in/api/v1/";
  // basePath = environment.basePath
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

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

  addresource(data){
    return this.http.post<[]>(this.basePath + "resourcesbylogin", data,this.httpOptions);
  }
}
