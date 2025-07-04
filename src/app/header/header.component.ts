import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/services/cart.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  cartCount = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.loadCartFromLocalStorage();
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
      
    });
  }
}
