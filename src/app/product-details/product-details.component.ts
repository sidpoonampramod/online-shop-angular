import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../shared/services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{
productId : number | undefined;
product : any;
constructor(private route : ActivatedRoute, private productService : ProductService, private cartService : CartService){}
ngOnInit(): void {
  this.productId = Number(this.route.snapshot.paramMap.get('id'));
   const idParam = this.route.snapshot.paramMap.get('id');
  this.productId = idParam ? +idParam : 0;

  if (this.productId > 0) {
    this.productService.getProductById(this.productId).subscribe({
      next: (res) => {
        this.product = res;
      },
      error: (err) => {
        console.error('Failed to load product:', err);
      }
    });
  } else {
    console.error('Invalid product ID');
  }
}
addToCart(){
  this.cartService.addToCart(this.product);
  alert('Product is Successfully added')
}
}