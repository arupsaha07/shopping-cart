import { Component, OnInit } from '@angular/core';
import { Login, SignUp } from '../data-type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  activeForm: boolean = true;
  authErrorMsg: string = "";

  constructor(private user: UserService) { }

  ngOnInit(): void {
    this.user.userAuthReload();
    // console.log(this.activeForm)
  }

  signup(data: SignUp) {
    this.user.userSignup(data);
    // console.log(data)
  }

  login(data: Login) {
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((res) => {
      this.authErrorMsg = "Please enter correct username or password";
    })
  }

  openLogin() {
    this.activeForm = true;
  }

  openSignup() {
    this.activeForm = false;
  }


}
