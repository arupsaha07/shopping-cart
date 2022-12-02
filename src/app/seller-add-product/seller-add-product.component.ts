import { Component, OnInit } from '@angular/core';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {

  addProductSuccessMsg: string | undefined = "";
  constructor(private product: ProductService, private router: Router) { }

  ngOnInit(): void {
  }

  addNewProduct(data: Product) {
    this.product.addProduct(data).subscribe((res) => {
      if (res) {
        this.addProductSuccessMsg = `<div class="alert alert-success" role="alert">Product added sucessfully!</div>`
      }
    })
    setTimeout(() => { this.addProductSuccessMsg = undefined; this.router.navigate(['seller-home']) }, 3000);
  }

}
