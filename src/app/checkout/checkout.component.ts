import { Component } from '@angular/core';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
 checkoutData = {
    name: '',
    address: '',
    phone: '',
    payment: 'COD'
  };

  orderPlaced = false;

  placeOrder() {
    localStorage.removeItem('cart'); // Clear cart
    this.orderPlaced = true;
  }
}
