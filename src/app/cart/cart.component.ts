import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { ApiService } from '../api.service';
import { ToolsService } from '../tools.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  standalone: true,
  imports: [CommonModule],
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
  public totalPrice: any;
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
        this.totalPriceFn(this.cartList);
      });
  }

  decreaseItem(item: any) {
    if (item.quantity >= 2) {
      item.quantity--;
      this.service
        .updateCartItem({
          quantity: item.quantity,
          price: item.product.price,
          productId: item.product.id,
        })
        .subscribe(() => {
          this.totalPriceFn(this.cartList);
        });
    }
  }

  deleteItem(id: number, name: string) {
    this.service.deleteCartItem(id).subscribe({
      next: () => {
        alert(`${name} removed from cart successfully`);
        this.getCartList();
      },
      error: (err) => alert(err),
    });
  }

  totalPriceFn(listNum: any) {
    if (listNum) {
      let prices = listNum.map((item: any) => {
        return item.product.price * item.quantity;
      });

      if (prices.length > 0) {
        let total = prices.reduce((prev: number, crnt: number) => {
          return prev + crnt;
        });

        this.totalPrice = total;
      } else {
        this.totalPrice = 0;
      }
    }
  }

  hideCart() {
    this.closeEmit.emit(false);
  }
}
