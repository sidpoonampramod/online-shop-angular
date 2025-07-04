import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartItems: any[] = [];
    private cartCount = new BehaviorSubject<number>(0);

    cartCount$ = this.cartCount.asObservable();
    constructor() { }

    addToCart(product: any) {
        const existingItem = this.cartItems.find(item => item.id === product.id)

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cartItems.push({ ...product, quantity: 1 })
        }
        this.updateCount();
         this.saveCartToLocalStorage();
    }
    
    getCartItems() {
        return this.cartItems

    }
    removeItem(id: number) {
        this.cartItems = this.cartItems.filter(item => item.id !== id)
        this.updateCount();
         this.saveCartToLocalStorage();

    }
    clearCart() {
        this.cartItems = [];
        this.updateCount();
         this.saveCartToLocalStorage();
    }
    increaseQuantity(productId: number) {
        const item = this.cartItems.find(p => p.id === productId)
        if (item) {
            item.quantity += 1;
        }
        this.updateCount();
         this.saveCartToLocalStorage();
    }
    decreaseQuantity(productId: number) {
        const item = this.cartItems.find(p => p.id === productId)

        if (item && item.quantity > 1) {
            item.quantity -= 1;
        } else if (item && item.quantity === 1) {
            this.removeItem(productId)
        }
        this.updateCount();
         this.saveCartToLocalStorage();
    }

    private updateCount() {
        const totalCount = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
        this.cartCount.next(totalCount);
    }
     saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  loadCartFromLocalStorage() {
    const data = localStorage.getItem('cart');
    if (data) {
      this.cartItems = JSON.parse(data);
      this.updateCount();
    }
  }
}