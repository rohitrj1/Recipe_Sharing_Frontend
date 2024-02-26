import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { AuthService } from '../../services/Auth/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatRadioModule,
    ReactiveFormsModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  isRegister = true;

  constructor(public authService : AuthService){}

  registrationForm = new FormGroup({
    fullName : new FormControl('',[Validators.required]),
    email : new FormControl('',[Validators.required,Validators.email]),
    password : new FormControl('',[Validators.required,Validators.minLength(6)]),
  })

  loginForm = new FormGroup({
    email : new FormControl('',[Validators.required,Validators.email]),
    password : new FormControl('',[Validators.required]),
  })

handleRegister(){
  console.log("register" ,this.registrationForm)
  this.authService.register(this.registrationForm.value).subscribe
  ({
    next:(response)=>{
      localStorage.setItem("jwt",response.jwt);
      this.authService.getUserProfile().subscribe();
      console.log("login sucess" , response)
    }
  })
}

handleLoginForm(){
  console.log("login" ,this.loginForm.value)
  this.authService.login(this.loginForm.value).subscribe
  ({
    next:(response)=>{
      localStorage.setItem("jwt",response.jwt);
      this.authService.getUserProfile().subscribe();
      console.log("login sucess" , response)
    }
  })
}

toggledPanel(){
  this.isRegister =!this.isRegister
}

}
