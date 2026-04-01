import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { ToolsService } from '../tools.service';

@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.component.html',
  styleUrl: './food-details.component.css',
  standalone: false,
})
export class FoodDetailsComponent {
  constructor(
    public service: ApiService,
    public toolsServ: ToolsService,
  ) {}

  @Output() closeEmit: EventEmitter<boolean> = new EventEmitter();
  @Input() public foodDetails: any;
  public itemQuantity: number = 1;
  public cartList: any;
  public addCartSMS: string = '';
  public isSmsShown: boolean = false;

  close() {
    this.closeEmit.emit(false);
  }

  addToCart(dataToPost: any) {
    this.service.getCartItems().subscribe((cartData: any) => {
      let isProdAtCart = cartData.find(
        (cartItem: any) => cartItem.product.id == dataToPost.id,
      );
      if (!isProdAtCart) {
        this.service
          .addToCart({
            quantity: this.itemQuantity,
            price: dataToPost.price,
            productId: dataToPost.id,
          })
          .subscribe({
            next: () => {
              this.addCartSMS = 'Product added to cart successfully';
              this.isSmsShown = true;
              this.toolsServ.updateCartPage.next(true);
              this.getCartList()
            },
            error: () => alert('Try again...'),
          });
      } else {
        this.service
          .updateCartItem({
            quantity: this.itemQuantity + isProdAtCart.quantity,
            price: dataToPost.price,
            productId: dataToPost.id,
          })
          .subscribe({
            next: () => {
              this.addCartSMS = `Product Quantity Increased to ${this.itemQuantity + isProdAtCart.quantity}`;
              this.isSmsShown = true;
              this.toolsServ.updateCartPage.next(true);
              this.getCartList()
            },
            error: () => alert('Try again...'),
          });
      }

      setTimeout(() => {
        this.isSmsShown = false;
      }, 2000);
    });
  }

  getCartList() {
    this.service.getCartItems().subscribe((data) => {
      this.cartList = data;

      this.toolsServ.cartItemNumber.next(this.cartList.length);
    });
  }
}
