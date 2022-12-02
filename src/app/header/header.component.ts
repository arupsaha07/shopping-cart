import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCartShopping, faMagnifyingGlass, faShop } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  localStorage: string = '';
  menuType: string = '';
  sellerName: string = '';
  searchResult: undefined | Product[];
  searchIcon = faMagnifyingGlass;
  logoIcon = faShop;
  cartIcon = faCartShopping;
  userName: string = '';

  constructor(private route: Router, private product: ProductService) { }

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          this.menuType = "seller";
          let sellerStore = localStorage.getItem('seller')
          let sellerData = sellerStore && JSON.parse(sellerStore)[0]
          this.sellerName = sellerData.name
        } else if (localStorage.getItem('user')) {
          this.menuType = 'user';
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
        } else {
          this.menuType = "default"
        }
      }
    })
  }

  sellerLogout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }
  userlogout() {
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
  }


  searchProduct(data: KeyboardEvent) {
    if (data) {
      const element = data.target as HTMLInputElement;
      this.product.searchProducts(element.value).subscribe((res) => {
        this.searchResult = res;
      })
    }
  }

  hideList() {
    this.searchResult = undefined;
  }

  getSearchInputValue(val: string) {
    this.route.navigate([`search/${val}`])
  }

}
