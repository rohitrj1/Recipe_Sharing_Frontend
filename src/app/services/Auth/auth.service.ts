import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:9009'

  constructor(private http:HttpClient) { }

  authSubject = new BehaviorSubject<any>({
    user:null
  });

login(userData:any):Observable<any>{
  return this.http.post<any>(`${this.baseUrl}/auth/login` ,userData)
}

register(userData:any):Observable<any>{
  return this.http.post<any>(`${this.baseUrl}/auth/signUp` ,userData)
}

getUserProfile():Observable<any>{
  const headers = new HttpHeaders({
    Authorization :`Bearer ${localStorage.getItem("jwt")}`
  })
  return this.http.get<any>(`${this.baseUrl}/api/user/profile` ,{headers}).pipe(
    tap((user)=>{
      console.log(user);
      const currentState = this.authSubject.value;
      this.authSubject.next({...currentState,user})
    })
  )
}

logout(){
  localStorage.clear();
  this.authSubject.next({});
}

}
