import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';  
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderModule } from 'ngx-order-pipe';
import { CustomPipe } from './custom.pipe';

import { AppComponent } from './app.component';
import { FareconfigComponent } from './fareconfig/fareconfig.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarModule } from 'ng-sidebar';
import { NgSearchFilterModule } from 'ng-search-filter';
import { LoginComponent } from './login/login.component';
import { FarelistComponent } from './farelist/farelist.component';
import { SlabsComponent } from './slabs/slabs.component';
import { AuthInterceptor } from './authconfig.interceptor';
import { UniquePipe } from './unique.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LogsComponent } from './logs/logs.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NavbarMainComponent } from './navbar-main/navbar-main.component';
// import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
    FareconfigComponent,
    CustomPipe,
    NavbarComponent,
    LoginComponent,
    FarelistComponent,
    SlabsComponent,
    UniquePipe,
    LogsComponent,
    HomePageComponent,
    NavbarMainComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    OrderModule,
    NgSearchFilterModule,
    // NgSelectModule,
    SidebarModule.forRoot(),
    ToastrModule.forRoot({
      toastClass: 'toast toast-bootstrap-compatibility-fix'
    }),
    NgbModule
  ],
  providers: [
    {provide : LocationStrategy , useClass: HashLocationStrategy},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
