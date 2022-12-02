import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Login, SignUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  isSellerLoggedin = new BehaviorSubject<boolean>(false);
  loginError = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { }

  userSignup(data: SignUp) {
    this.http
      .post('http://localhost:3000/seller', data, { observe: 'response' })
      .subscribe((result) => {
        this.isSellerLoggedin.next(true);
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
      });
  }

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedin.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  userLogin(data: Login) {
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, { observe: 'response' })
      .subscribe((result: any) => {
        if (result && result.body && result.body.length) {
          // console.log("user logged in")
          localStorage.setItem('seller', JSON.stringify(result.body));
          this.router.navigate(['seller-home']);
        } else {
          // console.warn("user is not logged in");
          this.loginError.emit(true);
        }
      })
  }
}
