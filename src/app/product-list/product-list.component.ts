import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
products: any[] = [];
constructor(private productService : ProductService){}
ngOnInit(): void {
  this.productService.getAllProducts().subscribe((res) => {
    this.products= res;
  })
}

}
