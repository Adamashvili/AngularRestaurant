import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getCartItems() {
    return this.http.get("https://restaurant.stepprojects.ge/api/Baskets/GetAll")
  }

  updateCartItem(body: any) {
    return this.http.put("https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket", body)
  }

  addToCart(body: any) {
    return this.http.post("https://restaurant.stepprojects.ge/api/Baskets/AddToBasket", body, {responseType: "text"})
  }

  deleteCartItem(id: number) {
    return this.http.delete(`https://restaurant.stepprojects.ge/api/Baskets/DeleteProduct/${id}`, {responseType: "text"})
  }

  getCategories() {
    return this.http.get("https://restaurant.stepprojects.ge/api/Categories/GetAll")
  }

  getProductsByCategory(id: number) {
    return this.http.get(`https://restaurant.stepprojects.ge/api/Categories/GetCategory/${id}`)
  }

  getAllProducts() {
    return this.http.get("https://restaurant.stepprojects.ge/api/Products/GetAll")
  }

  filterProducts(vegeterian: boolean, nuts: boolean, spcs: number, category: number) {
    return this.http.get(`https://restaurant.stepprojects.ge/api/Products/GetFiltered?vegeterian=${vegeterian}&nuts=${nuts}&spiciness=${spcs}&categoryId=${category}`)
  }


}
