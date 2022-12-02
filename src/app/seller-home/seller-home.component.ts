import { Component, OnInit } from '@angular/core';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | Product[];
  productMessage: undefined | string;
  deleteIcon = faTrash;
  editIcon = faPencilAlt

  constructor(private products: ProductService) { }

  ngOnInit(): void {
    this.list()
  }

  deleteProduct(id: number) {
    this.products.deleteProduct(id).subscribe((res) => {
      if (res) {
        this.productMessage = `<div class="alert alert-success" role="alert">Product deleted sucessfully</div>`
      }
      this.list();
    })

    setTimeout(() => {
      this.productMessage = undefined
    }, 3000)
  }

  list(){
    this.products.getAllProducts().subscribe((res) => {
      this.productList = res;
    })
  }

  

}
