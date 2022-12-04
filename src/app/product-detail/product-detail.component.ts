import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productData: undefined | Product;
  productQuantity: number = 1;
  removeCart = false;
  constructor(private activeRoute: ActivatedRoute, private product: ProductService) { }

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    productId && this.product.getProduct(productId).subscribe((res) => {
      this.productData = res;
      let cartData = localStorage.getItem('localCart');
      if(productId && cartData){
        let items = JSON.parse(cartData);
        items = items.filter((item:Product)=> productId == item.id.toString());
        if(items.length){
          this.removeCart = true;
        }else{
          this.removeCart = false;
        }
      }
    })
  }

  handleQty(val: string) {
    if (this.productQuantity < 20 && val == 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val == 'min') {
      this.productQuantity -= 1;
    }
  }

  addToCart(){
    if (this.productData){
      this.productData.quantity = this.productQuantity ;
      if(!localStorage.getItem('user')){
        this.product.localAddToCart(this.productData);
        this.removeCart = true;
      }
      // console.log(this.productData)
    }
  }

  removeFromCart(productId:number){
    this.product.removeItemFromCart(productId);
    this.removeCart = false;
  }


}
