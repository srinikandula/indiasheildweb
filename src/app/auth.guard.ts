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
    
      if(localStorage.getItem('token')!= null)
        {
          let url = window.location.hash;
          let signup:any = localStorage.getItem('signup');
          console.log(signup);
          if(url === '#/signup' &&  signup === 'true'){
            this.router.navigate(['/']);
          }else{
          return true; 
          }
        }
        else{
        //   if(this.dataService.isLoggedIn == false){
          this.router.navigate(['/login']);
          return false;
        // //}
          }
        }
  }
  
