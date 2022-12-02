import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignUp } from '../data-type';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  
  showLogin = true;
  authError:string = '';
  
  constructor(private seller: SellerService, private router: Router) { }
  
  ngOnInit(): void {
    this.seller.reloadSeller()
  }

  signUp(data: SignUp): void {
    this.seller.userSignup(data);
  }

  logIn(data: SignUp):void{
    this.seller.userLogin(data)
    this.seller.loginError.subscribe((err)=>{
      if(err){
        this.authError = "user email or password is wrong"
      }
    })
  }

  openSignup(){
    this.showLogin = true;
  }

  openLogin(){
    this.showLogin = false;
  }

}
