import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable ({
    providedIn: 'root'
})
export class CartService{
    private cartItems : any[] = [];
    private cartCount = new BehaviorSubject<number>(0);
    
    cartCount$ = this.cartCount.asObservable();
    constructor(){}

    addToCart(product : any){
        const existingItem = this.cartItems.find(item => item.id === product.id)

        if(existingItem){
            existingItem.quantity += 1;
        }else{
            this.cartItems.push({...product , quantity :1})
        }
         this.updateCount();
    }
    

    getCartItems(){
        return this.cartItems
    }
    removeItem(id : number){
        this.cartItems = this.cartItems.filter(item => item.id !== id)
        this.updateCount();

    }
    clearCart(){
        this.cartItems = [];
        this.updateCount();
    }
    increaseQuantity(productId : number){
      const item= this.cartItems.find(p => p.id === productId)
      if(item){
        item.quantity += 1;
      }
      this.updateCount();
    }
    decreaseQuantity(productId: number){
        const item = this.cartItems.find(p => p.id === productId)

        if(item && item.quantity > 1){
            item.quantity -= 1;
        }else if(item && item.quantity === 1 ){
             this.removeItem(productId)
        }
        this.updateCount();
    }

    private updateCount() {
    const totalCount = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    this.cartCount.next(totalCount);
  }
}