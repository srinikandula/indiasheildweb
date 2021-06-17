import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
  ) { }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      let url = window.location.hash;
      let signup = localStorage.getItem('signup');
      if(localStorage.getItem('token')!= null && signup === 'false')
        {
          // console.log(typeof signup);
          // console.log(signup);
          // console.log(url);
          // if(url === '#/signup' &&  signup === 'true'){
          //   this.router.navigate(['/']);
          // }else{
            return true; 
          // }
        }
        else{
        //   if(this.dataService.isLoggedIn == false){
          if(signup === 'true'){
            this.router.navigate(['/']);
          }else{
          this.router.navigate(['/login']);
          }
          return false;
        // //}
          }
        }
  }
  
