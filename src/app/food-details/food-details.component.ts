import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { ToolsService } from '../tools.service';

@Component({
    selector: 'app-food-details',
    templateUrl: './food-details.component.html',
    styleUrl: './food-details.component.css',
    standalone: false
})
export class FoodDetailsComponent implements OnInit {
  constructor(public actRoute: ActivatedRoute, public service: ApiService, public toolsServ: ToolsService) {}
  ngOnInit(): void {
    this.getQuery()
    this.getCartList()
  }

  public foodDetails: any;
  public itemQuantity: string = "1"
  public cartList: any;

  getQuery() {
    this.actRoute.queryParams.subscribe((data) => {
      this.foodDetails = data;
    });
  }

  addToCart(item: any) {
    this.service.addToCart({
      "quantity": this.itemQuantity,
      "price": item.price,
      "productId": item.id
    }).subscribe({
      next: () => {
        alert("Product added to cart successfully")
        this.getCartList()
      
      },
      error: () => alert("Try again...")
    })
  } 

  getCartList() {
    this.service.getCartItems().subscribe((data) => {
      this.cartList = data;
     
      this.toolsServ.cartItemNumber.next(this.cartList.length)

    
    });

}
}
