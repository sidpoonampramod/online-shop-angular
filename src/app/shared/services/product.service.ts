import { HttpClient } from "@angular/common/http";
import id from "@angular/common/locales/id";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn : 'root'
})
export class ProductService {
    private apiUrl = 'https://fakestoreapi.com/products';
    constructor(private http : HttpClient){}

   getAllProducts(): Observable<any> {
    return this.http.get(this.apiUrl);

   }

//    getProductById(productId: number): Observable<any>{
//      return this.http.get(`${this.apiUrl}/${id}`);
//    }
   getProductById(id: number): Observable<any> {
  return this.http.get(`https://fakestoreapi.com/products/${id}`);
}
}