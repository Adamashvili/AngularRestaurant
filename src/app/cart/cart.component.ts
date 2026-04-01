import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { ApiService } from '../api.service';
import { ToolsService } from '../tools.service';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from "../app-routing.module";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  standalone: true,
  imports: [CommonModule, AppRoutingModule],
})
export class CartComponent {
  constructor(
    private service: ApiService,
    public toolsServ: ToolsService,
  ) {
    this.getCartList();
    this.toolsServ.updateCartPage.subscribe(() => this.getCartList());
  }

  public cartList = signal<any>([]);
  public totalPrice = signal<number>(0);
  @Output() public closeEmit: EventEmitter<boolean> = new EventEmitter();

  getCartList() {
    this.service.getCartItems().subscribe((data) => {
      this.cartList.set(data);
      this.totalPriceFn(data);
      this.toolsServ.cartItemNumber.next(this.cartList.length);
    });
  }

  updateItem(item: any, action: any) {
    action == '+' ? item.quantity++ : item.quantity--;

    this.service
      .updateCartItem({
        quantity: item.quantity,
        price: item.product.price,
        productId: item.product.id,
      })
      .subscribe(() => {
       this.getCartList();
      });
  }

  

  deleteItem(id: number, name: string) {
    this.service.deleteCartItem(id).subscribe({
      next: () => {
        this.getCartList();
      },
      error: () => alert('Try again...'),
    });
  }

  totalPriceFn(listNum: any) {
    if (listNum) {
      let prices = listNum.map((item: any) => {
        return item.product.price * item.quantity;
      });

      if (prices.length > 0) {
        let total = prices.reduce((prev: number, crnt: number) => prev + crnt);

        this.totalPrice.set(total);
      } else {
        this.totalPrice.set(0);
      }
    }
  }

  hideCart() {
    this.closeEmit.emit(false);
  }
}
