import {NgModule} from '@angular/core';
import {Routes, RouterModule, ExtraOptions} from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomePageComponent } from './home-page/home-page.component';

import { LoginComponent } from './login/login.component';
import { NavbarMainComponent } from './navbar-main/navbar-main.component';
import { SignupComponent } from './signup/signup.component';


// const routerOptions: ExtraOptions = {
//     scrollPositionRestoration: 'enabled',
//     anchorScrolling: 'enabled',
//     scrollOffset: [0, 64],
//     useHash: true 
//   };

const routes: Routes = [
  // {path:'home',component:HomeComponent},
  //   {path: '',   redirectTo: '/fareconfig', pathMatch: 'full' },
  // // {
  // //   path: 'home',
  // //   component: NavbarComponent,
  // //   children: [
  // //     { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  // //   ]
  // // },
  // {
    
  //   path: 'fareconfig',
  //   component: NavbarComponent,
  //   children: [
  //     { path: '', component: FareconfigComponent, canActivate: [AuthGuard] },
  //   ]
  // },
  // {
  //   path: 'slabs',
  //   component: NavbarComponent,
  //   children: [
  //     { path: '', component: SlabsComponent, canActivate: [AuthGuard] },
  //   ]
  // },
  // {
  //   path: 'logs',
  //   component: NavbarComponent,
  //   children: [
  //     { path: '', component: LogsComponent, canActivate: [AuthGuard] },
  //   ]
  // },
  // {
  //   path: 'fareconfig/config',
  //   component: NavbarComponent,
  //   children: [
  //     { path: '', component: ConfigComponent, canActivate: [AuthGuard] },
  //   ]
  // },
  // {
  //   path: 'fareconfig/config2',
  //   component: NavbarComponent,
  //   children: [
  //     { path: '', component: Config2Component, canActivate: [AuthGuard] },
  //   ]
  // },
  // {
  //   path: 'cities',
  //   component: NavbarComponent,
  //   children: [
  //     { path: '', component: CitiesComponent, canActivate: [AuthGuard] },
  //   ]
  // },
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent, canActivate: [AuthGuard]},
  {path:'',component:NavbarMainComponent,children: [
        { path: '', component: HomePageComponent },
  ]},
  // {path:'farelist',component:FarelistComponent},
    // // {path: '', component:HomeComponent },
    // {path:'addcity',component:AddcityComponent},
    // {path:'fareconfig',component:FareconfigComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    // scrollPositionRestoration: 'enabled',
    // anchorScrolling: 'enabled',
    // // scrollOffset: [0, 64],
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }