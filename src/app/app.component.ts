import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bus';
  currentURL= window.location.href;

  
  constructor() { 
    // console.log(this.currentURL);
}
}

