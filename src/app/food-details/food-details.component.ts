import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  constructor(public service: ApiService, public toolsServ: ToolsService) { }
  ngOnInit(): void {
    // this.getQuery()
    // this.getCartList()


  }
  @Output() closeEmit: EventEmitter<boolean> = new EventEmitter()
  @Input() public foodDetails: any;
  public itemQuantity: number = 1
  public cartList: any;


  close() {
    this.closeEmit.emit(false)
  }

  //   getQuery() {
  //     this.actRoute.queryParams.subscribe((data) => {
  //       this.foodDetails = data;
  //     });
  //   }

  addToCart(dataToPost: any) {
    this.service.getCartItems().subscribe((cartData: any) => {
      let isProdAtCart = cartData.find((cartItem: any) => cartItem.product.id == dataToPost.id)
      if (!isProdAtCart) {
        this.service.addToCart({
          "quantity": this.itemQuantity,
          "price": dataToPost.price,
          "productId": dataToPost.id
        }).subscribe({
          next: () => {
            alert("Product added to cart successfully")


          },
          error: () => alert("Try again...")
        })
      }
      else {

        this.service.updateCartItem({
          "quantity": this.itemQuantity + isProdAtCart.quantity,
          "price": dataToPost.price,
          "productId": dataToPost.id
        }).subscribe({
          next: () => {
            alert("Product Increased")


          },
          error: () => alert("Try again...")
        })
      }

    })
  }


    getCartList() {
      this.service.getCartItems().subscribe((data) => {
        this.cartList = data;

        this.toolsServ.cartItemNumber.next(this.cartList.length)


      });

  }
}
