import { Component, OnInit } from '@angular/core';
import { ToolsService } from '../tools.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
    standalone: false
})
export class NavbarComponent implements OnInit {
  constructor(public toolsServ: ToolsService) {}
  ngOnInit(): void {
    this.showCartNum();
  }

  public cartNumber: any;

  showCartNum() {
    this.toolsServ.cartItemNumber.subscribe((num) => {
      this.cartNumber = num;
    });
  }
}
