import { Component, OnInit } from '@angular/core';
import { ToolsService } from '../tools.service';
import { ApiService } from '../api.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
    standalone: false
})
export class NavbarComponent implements OnInit {
  constructor(public  service: ApiService,public toolsServ: ToolsService) {}
  ngOnInit(): void {
    this.showCartNum();
    this.getCartNum()
  }

  public cartNumber: any;
  public showCart: boolean = false
   getCartNum() {
    this.service.getCartItems().subscribe(num => {
       this.cartNumber = num
      this.toolsServ.cartItemNumber.next(this.cartNumber.length)
    })
  }

  showCartNum() {
    this.toolsServ.cartItemNumber.subscribe((num) => {
      this.cartNumber = num;
    });
  }
}
