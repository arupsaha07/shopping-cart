import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';
import {Router} from'@angular/router'

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {
  productData: undefined | Product
  updateProductSuccessMsg: string | undefined = "";

  constructor(private route: ActivatedRoute, private product: ProductService, private router:Router) { }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get("id")
    productId && this.product.getProduct(productId).subscribe((data) => {
      this.productData = data;
    })
  }

  submit(data: Product) {
    // console.log(data)
    if(this.productData){
      data.id = this.productData.id;
    }
    this.product.updateProduct(data).subscribe((res) => {
      if (res) {
        this.updateProductSuccessMsg = `<div class="alert alert-success" role="alert">Product Updated Successfully</div>`
      }
    })
    setTimeout(() => {
      this.updateProductSuccessMsg = undefined;
      this.router.navigate(['seller-home'])
    }, 3000)
  }


}
