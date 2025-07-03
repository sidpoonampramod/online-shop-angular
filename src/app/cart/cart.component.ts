import { Component } from '@angular/core';
import { CartService } from '../shared/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems: any[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  removeItem(id: number) {
    this.cartService.removeItem(id);
    this.cartItems = this.cartService.getCartItems(); // refresh view
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
  increaseQty(id: number) {
    this.cartService.increaseQuantity(id);
    this.cartItems = this.cartService.getCartItems();
  }

  decreaseQty(id: number) {
    this.cartService.decreaseQuantity(id);
    this.cartItems = this.cartService.getCartItems();
  }

}
