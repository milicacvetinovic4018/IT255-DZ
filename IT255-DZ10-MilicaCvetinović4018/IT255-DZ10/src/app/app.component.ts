import { Component } from '@angular/core';
import { of } from 'rxjs';
import {UsersService} from './users.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IT255';
  data:any
  constructor(private user:UsersService){

    this.user.getData().subscribe(data=>{
      console.warn(data);
      this.data=data;
      this.data=Array.of(this.data);
    })
  }

  
}
