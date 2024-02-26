import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AuthService } from '../../services/Auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  user :any = null;
  constructor(public authService : AuthService,public router :Router){}

  ngOnInit(){
    console.log("ngOnInit");
    this.authService.getUserProfile().subscribe({
      next:data => console.log("req user" ,data),
      error : error=> console.log("error" , error)
    });
    this.authService.authSubject.subscribe(
      (auth)=>{
        console.log("auth state" ,auth)
        this.user = auth.user
      }
    )
  }

 handleLogout(){
  this.authService.logout()
  // this.router.
  }

}
