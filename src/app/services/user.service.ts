import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login, SignUp } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  invalidUserAuth = new EventEmitter<boolean>(false)

  constructor(private http: HttpClient, private router: Router) { }

  userSignup(data: SignUp) {
    this.http.post('http://localhost:3000/users', data, { observe: 'response' }).subscribe((res) => {
      // console.log(res)
      if (res) {
        localStorage.setItem('user', JSON.stringify(res.body));
        this.router.navigate(['/'])
      }
    })
  }


  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }


  userLogin(data: Login) {
    this.http.get<Login[]>(`http://localhost:3000/users?email=${data.email}&${data.password}`, { observe: 'response' }).subscribe((res) => {
      if (res && res.body?.length) {
        this.invalidUserAuth.emit(false);
        localStorage.setItem('user', JSON.stringify(res.body));
        this.router.navigate(['/'])
      } else {
        this.invalidUserAuth.emit(true);
      }
    })
  }


}
